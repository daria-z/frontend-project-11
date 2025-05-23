import {
  updateInputValue,
  addRssFeed,
  validateInput,
} from "./model.js";
import { renderUIText } from "./view.js";

renderUIText();

const input = document.querySelector("#url-input");
const form = document.querySelector("#rss-form");

input.addEventListener("input", (e) => {
  updateInputValue(e.target.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInput()
    .then(() => addRssFeed())
    .catch(() => console.log("валидация не пройдена"));
});
