import axios from 'axios';
const BASE_URL = 'http://localhost:8000';
export const createShortURL = (data) =>
  axios.post(`${BASE_URL}/shorturls`, data);
export const getStats = (code) =>
  axios.get(`${BASE_URL}/shorturls/${code}`);
