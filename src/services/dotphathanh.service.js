import api from '../api/axios';

const getAll = async () => {
    const response = await api.get('/dotphathanh');
    return response.data;
};

const getById = async (id) => {
    const response = await api.get(`/dotphathanh/${id}`);
    return response.data;
};
    
const create = async (data) => {
    return await api.post('/dotphathanh', data);
};

const update = async (id, data) => {
    return await api.put(`/dotphathanh/${id}`, data);
}

const remove = async (id) => {
    return await api.delete(`/dotphathanh/${id}`);
};

export default {
    getAll,
    getById,
    create,
    update,
    remove
};