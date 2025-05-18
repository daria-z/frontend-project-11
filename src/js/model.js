import onChange from "on-change";
import * as yup from "yup";
import i18next from "../i18n.js";

import { renderErrors, renderInputValue } from "./view.js";

const object = {
  inputValue: "",
  rssFeed: [],
  errors: null,
};

const state = onChange(object, (path, value) => {
  console.log(`состояние изменено: ${path}`, value);
  if (path === "rssFeed") {
    console.log("rss feed:", value);
  }
  if (path === "inputValue") {
    renderInputValue(value);
  }
  if (path === "errors") {
    renderErrors(value);
  }
});

const schema = yup
  .string()
  .url(i18next.t("invalid_url"))
  .required(i18next.t("required_field"))
  .test(
    "no-duplicate",
    i18next.t("no_duplicate"),
    (value) => !state.rssFeed.includes(value),
  );

export const validateInput = () => {
  return schema
    .validate(state.inputValue, { abortEarly: false })
    .then(() => {
      state.errors = null;
    })
    .catch((error) => {
      if (error instanceof yup.ValidationError) {
        state.errors = error.errors;
      }
      throw error;
    });
};

export const updateInputValue = (value) => {
  state.inputValue = value;
  state.errors = null;
};

export const addRssFeed = () => {
  state.rssFeed = [...state.rssFeed, state.inputValue];
  console.log("обновлён список rss", state.rssFeed);
};
