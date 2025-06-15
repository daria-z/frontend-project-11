import i18next from "../../i18n.js";
export const renderFeeds = (feeds) => {
  const feedsContainer = document.querySelector(".feeds");

  feedsContainer.innerHTML = `
    <div class="card border-0">
      <div class="card-body">
        <h2 class="card-title h4">${i18next.t("feeds")}</h2>
      </div>
      <ul class="list-group border-0 rounded-0">
        ${feeds
          .map(
            (feed) => `
          <li class="list-group-item border-0 border-end-0">
            <h3 class="h6 m-0">${feed.title}</h3>
            <p class="m-0 small text-black-50">${feed.description}</p>
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
  `;
};

export const renderFeedsPending = () => {
  const postsContainer = document.querySelector(".feeds");
  const spinner = document.createElement("div");
  spinner.classList.add("spinner-container");
  spinner.innerHTML = `
    <div
      id="posts-spinner"
      class="spinner-border text-primary d-none"
      role="status">
        <span>${i18next.t("ui.pending")}</span>
    </div>
  `;
  postsContainer.append(spinner);
};
