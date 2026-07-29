import axios from 'axios';

const api = axios.create({
    // If running Django locally, it's usually localhost:8000
    // Once deployed, change this to your Railway URL
    baseURL: 'http://localhost:5173/ , https://synergyapp.up.railway.app/'
});

export default api;