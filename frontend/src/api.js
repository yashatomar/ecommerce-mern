import axios from 'axios';

// In development, this uses localhost. In production, it uses the Vercel environment variable.
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  withCredentials: true, 
});

export default api;