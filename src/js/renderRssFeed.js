export const renderFeeds = (feeds) => {
  const feedsContainer = document.querySelector(".feeds");

  feedsContainer.innerHTML = `
    <div class="card border-0">
      <div class="card-body">
        <h2 class="card-title h4">Фиды</h2>
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

export const renderPosts = (posts, viewedPostsIds) => {
  const postsContainer = document.querySelector(".posts");

  postsContainer.innerHTML = `
  <div class="card border-0">
  <div class="card-body">
  <h2 class="card-title h4">Посты</h2>
  </div>
  <ul class="list-group border-0 rounded-0">
  ${posts
    .map(
      (post) => {
              const titleStyle = viewedPostsIds.includes(post.id) ? "fw-normal" : "fw-bold";
              return `
          <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
            <a href="${post.link}" class=${titleStyle} data-id="${post.id}" target="_blank" rel="noopener noreferrer">${post.title}</a>
            <button type="button" class="btn btn-outline-primary btn-sm modal-btn" data-id="${post.id}" data-bs-toggle="modal" data-bs-target="#modal">Просмотр</button>
          </li>
        `}
          )
          .join("")}
      </ul>
    </div>
  `;
};

