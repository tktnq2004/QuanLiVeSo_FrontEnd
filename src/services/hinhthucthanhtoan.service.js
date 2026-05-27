import api from '../api/axios';

const getAll = async () => {
    const response = await api.get('/hinhthucthanhtoan');
    return response.data;
};

export default {
    getAll
};