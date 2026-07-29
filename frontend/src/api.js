import axios from 'axios';

const api = axios.create({
  // This looks for VITE_API_URL. If it's missing (local), it defaults to localhost.
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
});

export default api;