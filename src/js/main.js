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
      .catch((error) => {
        console.log("валидация не пройдена:", error.message);
      });
  });

  postsContainer.addEventListener("click", (e) => {
    const button = e.target.closest(".modal-btn");
    if (button && button.dataset.id) {
      setActivePost(button.dataset.id);
    }
  });
};


