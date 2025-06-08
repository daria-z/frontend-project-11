import onChange from "on-change";
import { renderFeeds, renderPosts, renderViewedPost } from "./renderRssFeed.js";
import { closeModal, showModal } from "./renderModal.js";
import { renderErrors, renderInputValue } from "./view.js";
import { feedsChecking, markPostAsRead  } from "./model.js";

const createState = () => {
  const object = {
    form: {
      inputValue: "",
      error: null,
    },
    feedsList: [],
    feeds: [],
    posts: [],
    activeItem: null,
    ui: {
      error: null,
      loading: ''
    }
  };

  const state = onChange(object, (path, value) => {
    console.log(`состояние изменено: ${path}`, value);
    if (path === "feeds") {
      renderFeeds(value);
      feedsChecking();
    }
    if (path === "posts") {
      renderPosts(value);
    }
    if (path === "activeItem") {
      if (state.activeItem !== null) {
        showModal(state.activeItem);
        markPostAsRead(state.activeItem.id);
        renderViewedPost(state.activeItem.id);
      } else {
        closeModal();
      }
    }
    if (path === "form.inputValue") {
      renderInputValue(value);
    }
    if (path === "form.error") {
      renderErrors(value);
    }
    if (path === "ui.error") {
      renderErrors(value);
    }
  });

  return state;
};

export default createState;

