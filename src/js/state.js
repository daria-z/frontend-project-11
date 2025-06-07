import onChange from "on-change";
import { renderFeeds, renderPosts } from "./renderRssFeed.js";
import { closeModal, showModal } from "./renderModal.js";
import { renderErrors, renderInputValue } from "./view.js";
import { feedsChecking, markPostAsRead  } from "./model.js";

const createState = () => {
  const object = {
    form: {
      inputValue: "",
      errors: null,
    },
    feeds: [],
    posts: [],
    activeItem: null,
    viewedPostsIds: [],
  };

  const state = onChange(object, (path, value) => {
    console.log(`состояние изменено: ${path}`, value);
    if (path === "feeds") {
      renderFeeds(state.feeds);
      feedsChecking();
    }
    if (path === "posts") {
      renderPosts(state.posts, [...state.viewedPostsIds]);
      state.posts.forEach((post) => {
        post.rendered = true;
      });
    }
    if (path === "activeItem") {
      if (state.activeItem !== null) {
        showModal(state.activeItem);
        markPostAsRead(state.activeItem.id); //проверять на уникальность!
        renderPosts(state.posts, [...state.viewedPostsIds]);
      } else {
        closeModal();
      }
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





