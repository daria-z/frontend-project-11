import axios from "axios";
import { errorsHandler } from "./model.js";

export const fetchRssData = (link) => {
  const proxyUrl = `https://allorigins.hexlet.app/raw?url=${encodeURIComponent(link)}&disableCache=true`;

  return axios
    .get(proxyUrl)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      errorsHandler(error, "fetch");
      console.error("fetching or parsing error:", error);
      throw error;
    });
};

