const input = document.querySelector("#url-input");
const feedback = document.querySelector(".feedback");

export const renderErrors = (errors) => {
  if (errors && errors.length > 0) {
    input.classList.add("is-invalid");
    feedback.textContent = errors.join(", ");
  } else {
    input.classList.remove("is-invalid");
    feedback.textContent = "";
  }
};

export const renderInputValue = (value) => {
  input.value = value;
};
