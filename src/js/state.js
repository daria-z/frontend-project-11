import onChange from "on-change";
import { renderErrors, renderInputValue } from "./view.js";

const createState = () => {
  const object = {
    form: {
      inputValue: "",
      errors: ""
    },
    feed: {
      channel: {
        title: "",
        description: "",
        link: "",
      },
      items: [],
      activeItem: null,
    },
    ui: "",
  };

  // items: [
  //   {
  //     id: "1",
  //     title: "Post 1",
  //     description: "Description 1",
  //     link: "https://example.com/post1",
  //   },
  //   {
  //     id: "2",
  //     title: "Post 2",
  //     description: "Description 2",
  //     link: "https://example.com/post2",
  //   },
  // ],

  const state = onChange(object, (path, value) => {
    console.log(`состояние изменено: ${path}`, value);
    if (path === "feed") {
      console.log("rss feed:", value);
    }
    if (path === "activeItem") {
      // поиск по массиву постов
      // рендер модалки
    }
    if (path === "inputValue") {
      renderInputValue(value);
    }
    if (path === "errors") {
      renderErrors(value);
    }
  });

  return state;
};

export default createState;
