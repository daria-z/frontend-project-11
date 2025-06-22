import state from "../state";
import { fetchRssData } from "../fetchRssData.js";
import { parseRss } from "../parseRss.js";

import { addNew } from "./post.js";
import { handle } from "./error.js";

export const fetchAndParse = (url) => {
  state.ui.status = "pending";
  return fetchRssData(url)
    .then((xmlString) => {
      state.ui.status = "success";
      return parseRss(xmlString);
    })
    .catch((error) => {
      //посмотреть нужно ли тут и как обрабатывать ошибки
      throw error;
    });
};

export const updateState = ({ channel, items }) => {
  state.feeds.push(channel);
  state.feedsList.push(state.form.inputValue);
  addNew(items);
  state.form.inputValue = "";
};

export const add = () => {
  const url = state.form.inputValue;
  return fetchAndParse(url)
    .then(({ channel, items }) => {
      updateState({ channel, items });
    })
    .catch((error) => {
      //и тут корректное ли это решение
      handle(error, state.ui.error === "noRss" ? "parse" : "fetch");
      throw error;
    });
};
