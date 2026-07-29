import axios from 'axios';

const api = axios.create({
  // Vite looks for variables prefixed with VITE_
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
});

export default api;