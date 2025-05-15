const input = document.querySelector("input");
const feedback = document.querySelector("#feedback");

export const removeErrors = () => {
  input.classList.remove("is-invalid");
  feedback.textContent = '';
}

export const renderErrors = (errors) => {
  input.classList.add("is-invalid");

  if (errors === null) {
    removeErrors();
  } else {
    errors.map((error) => {
      feedback.textContent = error;
    });
  }
};




