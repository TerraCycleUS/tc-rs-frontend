import axios from 'axios'
import { setRetailersRefetch } from '../actions/location'
import store from '../store'

const http = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URL,
})

http.interceptors.request.use((config) => {
  const { user } = store.getState()
  if (user?.authorization) {
    config.headers = config.headers || {} // eslint-disable-line
    config.headers.Authorization = `Bearer ${user.authorization}` // eslint-disable-line
  }
  return config
})

http.interceptors.request.use((config) => {
  if (config.url === '/api/user/retailer') {
    store.dispatch(setRetailersRefetch(true))
  }

  return config
})

export default http
