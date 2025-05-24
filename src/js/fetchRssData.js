import axios from "axios";
import { parseRss } from "./parseRss";

export const fetchRssData = (state) => {
  axios
    .get(
      `https://allorigins.hexlet.app/raw?url=${encodeURIComponent(state.inputValue)}`,
      {
        timeout: 5000,
      }
    )
    .then((response) => parseRss(response.data))
    .catch((error) => console.error("fetching or parsing error:", error));
};

