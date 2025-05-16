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
    "no-duplicate",
    "Эта лента уже добавлена",
    (value) => !state.rssFeed.includes(value)
  );


export const createModel = () => {
  const validateInput = (value) => {
    return schema
      .validate(value)
      .then((validatedValue) => {
        state.errors = null;
        return validatedValue;
      })
      .catch((error) => {
        if (error instanceof yup.ValidationError) {
          state.errors = error.errors;
        }
        throw error;
      });
  };

  const updateInputValue = (value) => {
    state.inputValue = value;
    state.errors = null;
  };

  const addRssFeed = () => {
    state.rssFeed = [...state.rssFeed, state.inputValue];
    state.errors = null;
  };

  const getErrors = () => {
    return state.errors;
  };

  return {
    updateInputValue, validateInput, addRssFeed, getErrors
  };
};
