import onChange from "on-change";
import { renderFeeds, renderPosts } from "./renderRssFeed.js";
import { closeModal, showModal } from "./renderModal.js";
import { renderErrors, renderInputValue } from "./view.js";
import { feedsChecking } from "./model.js";

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
      renderFeeds(state.feeds);
      feedsChecking();
    }
    if (path === "posts") {
      renderPosts(state.posts);
    }
    if (path === "activeItem") {
      (state.activeItem !== null) ? showModal(state.activeItem) : closeModal();
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




