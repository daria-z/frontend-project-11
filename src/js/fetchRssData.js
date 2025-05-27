import axios from "axios";

export const fetchRssData = (state) => {
  const proxyUrl = `https://allorigins.hexlet.app/raw?url=${encodeURIComponent(state.form.inputValue)}`;

  return axios
    .get(proxyUrl, { timeout: 10000 })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("fetching or parsing error:", error);
      throw error;
    });
};

