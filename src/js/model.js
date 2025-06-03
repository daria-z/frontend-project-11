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
  return fetchRssData(url).then((xmlString) => parseRss(xmlString)).catch((error) => {
    console.error("fetchAndParseRss:", error);
    throw error;
  })
};

const updateFeedsAndPostsState = ({ channel, items}) => {
      if (state.feeds.some((feed) => feed.link === channel.link)) {
        state.form.errors = i18next.t("no_duplicate");
        return;
      }
      const existingIds = new Set(state.posts.map((post) => post.id));
      const newItems = items.filter((item) => !existingIds.has(item.id));
      state.feeds = [...state.feeds, channel];
      state.posts = [...state.posts, ...newItems];
      state.form.inputValue = "";
      console.log("обновлён список rss", state.feeds);
};

export const addRssFeed = () => {
  return fetchAndParseFeed(state.form.inputValue)
    .then(({ channel, items }) => updateFeedsAndPostsState({ channel, items }))
    .catch((error) => {
      throw error;
    });
};

export const checkRssFeed = () => {
  state.feeds.forEach((feed) => {
    console.log("Проверка фида:", feed.link);
    fetchRssData(feed.link)
      .then((xmlString) => parseRss(xmlString))
      .then(({ channel, items }) => {
        console.log("в ленте", channel, ":", items);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

export const setActivePost = (id) => {
  console.log(state.posts);
  state.activeItem = state.posts.find((post) => post.id === id);
};
