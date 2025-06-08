import i18next from "../i18n.js";
const title = document.querySelector("#main-title");
const subtitle = document.querySelector("#subtitle");
const input = document.querySelector("#url-input");
const label = document.querySelector("#url-label");
const addBtn = document.querySelector("#add-feed-btn");
const example = document.querySelector("#example");
const feedback = document.querySelector("#feedback");
const fullBtn = document.querySelector("#btn-full");
const closeBtn = document.querySelector("#btn-close");

export const renderUIText = () => {
  title.textContent = i18next.t("title");
  subtitle.textContent = i18next.t("subtitle");
  input.placeholder = i18next.t("form_placeholder");
  label.textContent = i18next.t("form_placeholder");
  addBtn.textContent = i18next.t("add_btn");
  fullBtn.textContent = i18next.t("full_btn");
  closeBtn.textContent = i18next.t("close_btn");
  example.textContent = i18next.t("example");
};

export const renderErrors = (error) => {
  if (error) {
    input.classList.add("is-invalid");
    feedback.textContent = i18next.t(`errors.${error}`);
  } else {
    input.classList.remove("is-invalid");
    feedback.textContent = "";
  }
};

export const renderInputValue = (value) => {
  input.value = value;
};

