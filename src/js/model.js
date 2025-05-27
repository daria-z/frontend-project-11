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
  state.form.inputValue = value;
  state.form.errors = null;
};

export const addRssFeed = () => {
  fetchRssData(state)
    .then((xmlString) => parseRss(xmlString))
    .then(({ channel, items }) => {
      state.feeds = [...state.feeds, channel];
      state.posts = [...state.posts, ...items];
      state.form.inputValue = "";
      console.log("обновлён список rss", state.feeds);
    })
    .catch((error) => {
      throw error;
    });
};
