import { updateInputValue, addRssFeed } from "./model";

const input = document.querySelector("#url-input");
const form = document.querySelector("#rss-form");

input.addEventListener('input', (e) => {
  updateInputValue(e.target.value);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addRssFeed();
});






