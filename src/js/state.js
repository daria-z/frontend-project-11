import onChange from 'on-change'
import i18next from '../i18n.js'
import { view } from './view/index.js'
import { model } from './model/index.js'

const createState = () => {
  const object = {
    form: {
      inputValue: '',
      // error: null,
    },
    feedsList: [],
    feeds: [],
    posts: [],
    activeItem: null,
    ui: {
      lng: 'ru',
      status: null, // 'error', 'success', 'pending'
      error: null,
    },
  }

  return onChange(object, (path, value) => {
    console.log(`состояние изменено: ${path}`, value)
    switch (path) {
      case 'feeds':
        view.feeds.renderFeeds(value)
        model.update.checkFeeds()
        break
      case 'posts':
        view.posts.renderPosts(value)
        break
      case 'activeItem':
        if (state.activeItem !== null) {
          view.modal.showModal(state.activeItem)
          model.post.markAsRead(state.activeItem.id)
          view.posts.renderViewedPost(state.activeItem.id)
        }
        else {
          view.modal.closeModal()
        }
        break
      case 'form.inputValue':
        view.form.renderInputValue(value)
        break
      case 'ui.status':
        view.ui.renderUi(value, state.ui.error)
        break
      case 'ui.error':
        if (state.ui.status === 'error') {
          view.ui.renderUi('error', value)
        }
        break
      case 'ui.lng':
        i18next.changeLanguage(state.ui.lng)
        view.ui.renderUIText()
        break
    }
  })
}

const state = createState()

export default state
