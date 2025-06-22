import state from "../state.js";
import { fetchAndParse } from "./feed.js";
import { addNew } from "./post.js";

export const checkFeeds = () => {
  const promises = state.feedsList.map((feed) => {
    state.ui.status = 'pending';
    state.ui.error = null;
    return fetchAndParse(feed)
      .then(({ items }) => {
        return items;
      })
      .catch((error) => {
        state.ui.status = "error";
        model.error.handle(error, "fetch");
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
