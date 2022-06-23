import axios from 'axios'

const http = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URL,
})

export default http
