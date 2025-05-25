export const renderRssFeed = () => {
  const wrapper = `
  <div class="card border-0">
    <div class="card-body">
      <h2 class="card-title h4">Посты</h2>
    </div>
    <ul class="list-group border-0 rounded-0">
    </ul>
  </div>`;

  const postsContainer = document.querySelector(".posts");
  postsContainer.innerHTML = wrapper;

  const ul = document.createElement('ul');
  ul.className = "list-group border-0 rounded-0";

  postsContainer.appendChild(ul);

  const li = document.createElement('li');
  li.className =
    "list-group-item d-flex justify-content-between align-items-start border-0 border-end-0";
  li.innerHTML = `
    <a href="#" class="fw-bold" data-id="" target="_blank" rel="noopener noreferrer"></a>
    <button type="button" class="btn btn-outline-primary btn-sm" data-id="" data-bs-toggle="modal" data-bs-target="#modal">Просмотр</button>
  `;

  ul.appendChild(li);
};
