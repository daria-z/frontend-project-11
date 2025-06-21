import axios from "axios";
import { model } from "./model/index.js";

export const fetchRssData = (link) => {
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`;
  return axios
    .get(proxyUrl)
    .then((response) => {
      const data = response.data;
      return data.contents;
    })
    .catch((error) => {
      model.error.handle(error, "fetch");
      throw error;
    });
};
