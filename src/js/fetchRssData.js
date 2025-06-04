import axios from "axios";

export const fetchRssData = (link) => {
  const proxyUrl = `https://allorigins.hexlet.app/raw?url=${encodeURIComponent(link)}`;

  return axios
    .get(proxyUrl)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("fetching or parsing error:", error);
      throw error;
    });
};

