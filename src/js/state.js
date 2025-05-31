import onChange from "on-change";
import { renderRssFeed } from "./renderRssFeed.js";
import { renderErrors, renderInputValue, showModal } from "./view.js";
import { checkRssFeed } from "./model.js";

const createState = () => {
  const object = {
    form: {
      inputValue: "",
      errors: null,
    },
    feeds: [],
    posts: [],
    activeItem: null,
  };

  const state = onChange(object, (path, value) => {
    console.log(`состояние изменено: ${path}`, value);
    if (path === "feeds") {
      checkRssFeed();
    }
    if (path === "feeds" || path === "posts") {
      renderRssFeed(state);
    }
    if (path === "activeItem") {
      showModal(state.activeItem);
    }
    if (path === "form.inputValue") {
      renderInputValue(value);
    }
    if (path === "form.errors") {
      renderErrors(value);
    }
  });

  return state;
};

export default createState;

