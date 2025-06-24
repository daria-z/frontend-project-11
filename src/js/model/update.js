import state from '../state.js'
import { fetchAndParse } from './feed.js'
import { addNew } from './post.js'
import { handle } from './error.js'

export const checkFeeds = async () => {
  const promises = state.feedsList.map(async (feed) => {
    state.ui.status = 'pending'

    try {
      const { items } = await fetchAndParse(feed)
      return items
    }
    catch (error) {
      state.ui.status = 'error'
      handle(error, 'fetch')
      return []
    }
  })

  const results = await Promise.all(promises)
  const newPosts = results.flat()
  addNew(newPosts)
}

export const startFeedChecks = async () => {
  if (state.feeds.length === 0) {
    return
  }

  try {
    await checkFeeds()
    setTimeout(startFeedChecks, 10000)
  }
  catch (error) {
    console.error(error.message)
    setTimeout(startFeedChecks, 10000)
  }
}
