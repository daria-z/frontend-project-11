const form = document.querySelector("#rss-form");
const input = document.querySelector("#url-input");
const feedback = document.querySelector("#feedback");

export const createView = () => {
  const bindInputChange = (handler) => {
    input.addEventListener('input', (e) => {
      handler(e.target.value);
    })
  };

  const bindAddFeed = (handler) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handler()
    })
  };

  const removeErrors = () => {
    input.classList.remove("is-invalid");
    feedback.textContent = "";
  };

  const renderErrors = (errors) => {
    input.classList.add("is-invalid");

    if (errors === null) {
      removeErrors();
    } else {
      errors.map((error) => {
        feedback.textContent = error;
      });
    }
  };

  return {
    bindInputChange,
    bindAddFeed,
    renderErrors
  }
};






