import axios from 'axios'
import { getTokenFromStorage } from '../utils/token'

const isDevelopment = import.meta.env.MODE === 'development'
let baseURL = process.env.BACKEND_ORIGIN

if (!isDevelopment) {
  // Update this later when you have a working backend server
  baseURL = 'http://localhost:3000/'
}

const api = axios.create({
  baseURL
})

const token = getTokenFromStorage()
if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`
}

export default api
