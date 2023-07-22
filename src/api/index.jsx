import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://themealdb.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
})
