import state from "../state.js";
import { fetchAndParse } from "./feed.js";
import { addNew } from "./post.js";

export const checkFeeds = () => {
  const promises = state.feedsList.map((feed) => {
    return fetchAndParse(feed)
      .then(({ items }) => {
        return items;
      })
      .catch((error) => {
        console.error("Ошибка проверки фида:", feed, error.message);
        return [];
      });
  });

  return Promise.all(promises).then((results) => {
    const newPosts = results.flat();
    addNew(newPosts);
  });
};

export const startFeedChecks = () => {
  if (state.feeds.length === 0) {
    return;
  }
  checkFeeds()
    .then(() => {
      setTimeout(startFeedChecks, 10000);
    })
    .catch((error) => {
      console.error(error.message);
      setTimeout(startFeedChecks, 10000);
    });
};

