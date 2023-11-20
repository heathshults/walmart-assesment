import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 1000,
  headers: {'X-Custom-Header': 'Rick&Morty'}
});


export default api


export const config = {
  appName: 'Rick&Morty',
  appUrl: 'https://rickandmortyapi.com',
  api: axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'Rick&Morty'}
  })
}