import axios from 'axios'
import { model } from './model/index.js'

export const fetchRssData = async (link) => {
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`

  try {
    const response = await axios.get(proxyUrl)
    return response.data.contents
  }
  catch (error) {
    model.error.handle(error, 'fetch')
    throw error
  }
}
