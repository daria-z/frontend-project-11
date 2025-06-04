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
    (value) => !state.feeds.some((feed) => feed.link === value)
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
      // console.log("Полученные данные:", xmlString);
      return parseRss(xmlString);
    })
    .catch((error) => {
      throw error;
    })
};

const addNewPosts = (items) => {
  const existingIds = new Set(state.posts.map((post) => post.id));
  const newPosts = items
    .filter((item) => !existingIds.has(item.id));
  state.posts = [...state.posts, ...newPosts];
};

const updateFeedsAndPostsState = ({ channel, items }) => {
  state.feeds = [...state.feeds, channel];
  addNewPosts(items);
  state.form.inputValue = "";
};

export const addRssFeed = () => {
  return fetchAndParseFeed(state.form.inputValue)
    .then(({ channel, items }) => {
      updateFeedsAndPostsState({ channel, items });
      // return { channel, items };
    })
    .catch((error) => {
      console.error("Ошибка в addRssFeed:", error.message);
      throw error;
    });
};

export const feedsChecking = () => {
  if (state.feeds.length === 0) {
    // setTimeout(feedsChecking, 10000);
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
  const promises = state.feeds.map((feed) => {
    return fetchAndParseFeed(feed.link)
      .then(({ items }) => {
        return items;
      })
      .catch((error) => {
        console.error("Ошибка проверки фида:", feed.link, error.message);
        return [];
      });
  });

  return Promise.all(promises).then((results) => {
    const newPosts = results.flat();
    addNewPosts(newPosts);
  });
};

export const setActivePost = (id) => {
  state.activeItem = state.posts.find((post) => post.id === id);
  console.log(state.activeItem);
};
