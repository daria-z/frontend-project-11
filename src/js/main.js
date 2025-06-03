import { renderUIText } from "./view.js";
import {
  updateInputValue,
  addRssFeed,
  validateInput,
  setActivePost,
  // checkRssFeed,
  feedsChecking,
} from "./model.js";

export const initApp = () => {
  renderUIText();
  feedsChecking();

  const input = document.querySelector("#url-input");
  const form = document.querySelector("#rss-form");
  const postsContainer = document.querySelector(".posts");

  input.addEventListener("input", (e) => {
    updateInputValue(e.target.value);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateInput()
      .then(() => addRssFeed())
      .catch(() => console.log("валидация не пройдена"));
  });

  postsContainer.addEventListener("click", (e) => {
    const button = e.target.closest(".modal-btn");
    console.log("id:", button.dataset.id);
    if (button && button.dataset.id) {
      setActivePost(button.dataset.id);
    }
  });
};


