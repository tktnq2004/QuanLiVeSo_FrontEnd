import axios from 'axios';

const api = axios.create({
    baseURL: 'https://quanliveso-webserver.onrender.com/api'
});

export default api;