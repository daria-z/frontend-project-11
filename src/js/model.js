import * as yup from "yup";
import i18next from "../i18n.js";
import { fetchRssData } from "./fetchRssData.js";
import { parseRss } from "./parseRss.js";
// import { renderRssFeed } from "./renderRssFeed.js";

import createState from './state.js';

const state = createState();

const schema = yup
  .string()
  .url(i18next.t("invalid_url"))
  .required(i18next.t("required_field"))
  .test(
    "no-duplicate",
    i18next.t("no_duplicate"),
    (value) => !state.feedsList.includes(value)
  );

export const validateInput = () => {
  return schema
    .validate(state.form.inputValue, { abortEarly: false })
    .then(() => {
      state.form.errors = null;
      return state.form.inputValue;
    })
    .catch((error) => {
      if (error instanceof yup.ValidationError) {
        state.form.errors = error.errors;
      }
      throw error;
    });
};

export const updateInputValue = (value) => {
  if (value === null) return;
  state.form.inputValue = value;
  if (state.form.errors) state.form.errors = null;
};

const fetchAndParseFeed = (url) => {
  return fetchRssData(url)
    .then((xmlString) => {
      return parseRss(xmlString);
    })
    .catch((error) => {
      throw error;
    })
};

const addNewPosts = (posts) => {
  const existingIds = new Set(state.posts.map((post) => post.id));
  const newPosts = posts
    .filter((post) => !existingIds.has(post.id))
    .map((post) => ({ ...post, viewed: false }));
  state.posts.unshift(...newPosts);
};

const updateFeedsAndPostsState = ({ channel, items }) => {
  state.feeds.push(channel);
  state.feedsList.push(state.form.inputValue);
  addNewPosts(items);
  state.form.inputValue = "";
};

export const addRssFeed = () => {
  return fetchAndParseFeed(state.form.inputValue)
    .then(({ channel, items }) => {
    updateFeedsAndPostsState({ channel, items });
  })
    .catch((error) => {
      console.error("Ошибка в addRssFeed:", error.message);
      throw error;
    });
};

export const feedsChecking = () => {
  if (state.feeds.length === 0) {
    return;
  }
  checkRssFeed()
    .then(() => {
      setTimeout(feedsChecking, 10000);
    })
    .catch((error) => {
      console.error(error.message);
      setTimeout(feedsChecking, 10000);
    });
};

export const checkRssFeed = () => {
  const promises = state.feedsList.map((feed) => {
    // передавать нормальную ссылку на feed
    console.log("feed link:", feed)
    return fetchAndParseFeed(feed)
      .then(({ items }) => {
        return items;
      })
      .catch((error) => {
        console.error("Ошибка проверки фида:", feed, error.message);
        return [];
      });
  });

  return Promise.all(promises).then((results) => {
    const newPosts = results.flat();
    addNewPosts(newPosts);
  });
};

export const setActivePost = (id) => {
  if (id === null) {
    state.activeItem = null;
    return;
  };
  state.activeItem = state.posts.find((post) => post.id === id);
};

export const markPostAsRead = (id) => {
  const post = state.posts.find(post => post.id === id);
  if (post && !post.viewed) {
    post.viewed = true;
  }
};
