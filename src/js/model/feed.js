import state from "../state";
import { fetchRssData } from "../fetchRssData.js";
import { parseRss } from "../parseRss.js";

import { addNew } from "./post.js";
import { handle } from "./error.js";

export const fetchAndParse = (url) => {
  state.ui.pending = true;
  // state.ui.error = null;
  return fetchRssData(url)
    .then((xmlString) => {
      state.ui.pending = false;
      state.ui.success = true;
      return parseRss(xmlString);
    })
    .catch((error) => {
      state.ui.pending = false;
      handle(error, error.message === "noRss" ? "parse" : "fetch");
      throw error;
    });
};

export const updateState = ({ channel, items }) => {
  state.feeds.push(channel);
  state.feedsList.push(state.form.inputValue);
  addNew(items);
  state.form.inputValue = "";
  // state.ui.error = null;
};

export const add = () => {
  const url = state.form.inputValue;
  return fetchAndParse(url)
    .then(({ channel, items }) => {
      updateState({ channel, items });
      // state.ui.error = null;
    })
    .catch((error) => {
      handle(error, error.message === "noRss" ? "parse" : "fetch");
      throw error;
    });
};
