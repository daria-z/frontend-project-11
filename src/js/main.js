import { view } from "./view/index.js";
import { model } from "./model/index.js";

export const initApp = () => {
  view.ui.renderUIText();
  model.update.startFeedChecks();

  const input = document.querySelector("#url-input");
  const form = document.querySelector("#rss-form");
  const postsContainer = document.querySelector(".posts");
  const closeModalBtns = document.querySelectorAll('[data-bs-dismiss="modal"]');
  const langSwitcher = document.querySelector("#languageSelectFooter");

  input.addEventListener("input", (e) => {
    model.form.updateInputValue(e.target.value);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    model.form
      .validateInput()
      .then(() => model.feed.add())
      .catch((error) => {
        console.log("валидация не пройдена:", error.message);
      });
    e.target.reset();
  });

  postsContainer.addEventListener("click", (e) => {
    const button = e.target.closest(".modal-btn");
    if (button && button.dataset.id) {
      model.post.setActive(button.dataset.id);
    }
  });

  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      model.post.setActive(null);
    });
  });

  langSwitcher.addEventListener('change', (e) => {
    model.lng.handle(e.target.value);
  })
};
