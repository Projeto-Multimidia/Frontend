// src/api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',  // Atualize para o endpoint do seu backend
});

export default api;
