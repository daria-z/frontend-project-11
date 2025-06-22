import state from '../state.js'

export const addNew = (posts) => {
  const existingIds = new Set(state.posts.map(post => post.id))
  const newPosts = posts
    .filter(post => !existingIds.has(post.id))
    .map(post => ({ ...post, viewed: false }))
  state.posts.unshift(...newPosts)
}

export const setActive = (id) => {
  if (id === null) {
    state.activeItem = null
    return
  }
  state.activeItem = state.posts.find(post => post.id === id)
}

export const markAsRead = (id) => {
  const post = state.posts.find(post => post.id === id)
  if (post && !post.viewed) {
    post.viewed = true
  }
}
