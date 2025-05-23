import onChange from "on-change";
import { renderErrors, renderInputValue } from "./view.js";

const createState = () => {
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

  return state;
};

export default createState;
