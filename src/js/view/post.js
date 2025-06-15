import i18next from "../../i18n.js";
export const renderPosts = (posts) => {
  const postsContainer = document.querySelector(".posts");

  postsContainer.innerHTML = `
  <div class="card border-0">
  <div class="card-body">
  <h2 class="card-title h4">${i18next.t("posts")}</h2>
  </div>
  <ul class="list-group border-0 rounded-0">
  ${posts
    .map((post) => {
      const titleStyle = post.viewed ? "fw-normal" : "fw-bold";
      return `
          <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
            <a href="${post.link}" class=${titleStyle} data-id="${post.id}" target="_blank" rel="noopener noreferrer">${post.title}</a>
            <button type="button" class="btn btn-outline-primary btn-sm modal-btn" data-id="${post.id}" data-bs-toggle="modal" data-bs-target="#modal">${i18next.t("preview")}</button>
          </li>
        `;
    })
    .join("")}
      </ul>
    </div>
  `;
};

export const renderPostsPending = () => {
  const postsContainer = document.querySelector(".posts");
  postsContainer.innerHTML = `
    <div
      id="posts-spinner"
      class="spinner-border text-primary d-none"
      role="status">
        <span>Загрузка постов...</span>
    </div>
  `;
};

export const renderViewedPost = (id) => {
  const viewedPost = document.querySelector(`[data-id="${id}"]`);
  viewedPost.classList.remove("fw-bold");
  viewedPost.classList.add("fw-normal");
};
