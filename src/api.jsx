import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',  // Defina o endpoint do seu backend
});

export default api;
