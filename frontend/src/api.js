import axios from 'axios';

// Use the proxy path - Vercel will forward this to Render
const baseURL = '/api';

const api = axios.create({
  baseURL,
  withCredentials: true, 
});

export default api;