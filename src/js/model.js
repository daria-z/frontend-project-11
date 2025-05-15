import onChange from "on-change";
import * as yup from 'yup';

const object = {
  inputValue: '',
  rssFeed: [],
  errors: null
};

const state = onChange(object, (path, value) => {
  console.log(`состояние изменено: ${path}`, value);
});

const schema = yup
  .string()
  .url("Ссылка должна быть валидным URL")
  .required("Обязательное поле")
  .test(
    "Эта лента уже добавлена",
    (value) => !state.rssFeed.includes(value)
  );

const validateInput = (value) => {
  try {
    schema.validateSync(value, { abortEarly: false });
    return true;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      state.errors = error.errors;
      return false;
    }
    throw error;
  }
};

export const updateInputValue = (value) => {
  state.inputValue = value;
  state.errors = null;
};

export const addRssFeed = () => {
  if (validateInput(state.inputValue)) {
    state.rssFeed = [...state.rssFeed, state.inputValue];
    console.log("обновлён список rss", state.rssFeed);
    state.errors = null;
  } else {
    console.log("не прошёл валидацию:", state.errors);
  }
};

export const getErrors = () => {
  return state.errors;
};









