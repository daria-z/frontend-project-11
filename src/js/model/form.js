import * as yup from "yup";

import state from "../state.js";

const schema = yup
  .string()
  .url("notUrl")
  .required("required")
  .test(
    "no-duplicate",
    "exists",
    (value) => !state.feedsList.includes(value)
  );

export const validateInput = () => {
  state.ui.success = false;
  return schema
    .validate(state.form.inputValue)
    .then(() => {
      state.ui.error = null;
      return state.form.inputValue;
    })
    .catch((error) => {
      state.ui.error = error.errors.join();
      throw error;
    });
};

export const updateInputValue = (value) => {
  if (value === null) return;
  state.form.inputValue = value;
  if (state.ui.error) state.ui.error = null;
};
