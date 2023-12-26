import axios from 'axios'
import { getTokenFromStorage } from '../utils/token'

// here we'll add in vercel our backend project url in the env variables so either from this env or vercel
const BASE_URL = import.meta.env.VITE_BACKEND_ORIGIN || 'http://localhost:3003'

const api = axios.create({
  baseURL: BASE_URL
})

const token = getTokenFromStorage()
if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`
}

export default api
