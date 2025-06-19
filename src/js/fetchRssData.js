import axios from "axios";
import { model } from "./model/index.js";

export const fetchRssData = (link) => {
  const proxyUrl = `https://allorigins.hexlet.app/raw?url=${encodeURIComponent(link)}&disableCache=true`;
  console.log(proxyUrl.searchParams.get('url'));
  return axios
    .get(proxyUrl)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      model.error.handle(error, "fetch");
      throw error;
    });
};
