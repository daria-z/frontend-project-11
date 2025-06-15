import onChange from "on-change";
import { view } from "./view/index.js";
import { feedsChecking, markPostAsRead  } from "./model.js";

const createState = () => {
  const object = {
    form: {
      inputValue: "",
      // error: null,
    },
    feedsList: [],
    feeds: [],
    posts: [],
    activeItem: null,
    ui: {
      error: null,
      pending: false,
      success: false
    }
  };

  const state = onChange(object, (path, value) => {
    console.log(`состояние изменено: ${path}`, value);
    if (path === "feeds") {
      view.feeds.renderFeeds(value);
      feedsChecking();
    }
    if (path === "posts") {
      view.posts.renderPosts(value);
    }
    if (path === "activeItem") {
      if (state.activeItem !== null) {
        view.modal.showModal(state.activeItem);
        markPostAsRead(state.activeItem.id);
        view.posts.renderViewedPost(state.activeItem.id);
      } else {
        view.modal.closeModal();
      }
    }
    if (path === "form.inputValue") {
      view.form.renderInputValue(value);
    }
    if (path === "ui.error") {
      view.ui.renderUi('error', value);
    }
    if (path === "ui.success") {
      view.ui.renderUi("success");
    }
    if (path === "ui.pending") {
      view.ui.renderUi("pending");
    }
  });

  return state;
};

export default createState;
