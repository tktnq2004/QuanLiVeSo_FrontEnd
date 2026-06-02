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
    const response = await api.post('/dotphathanh', data);
    return response.data;
};

const update = async (id, data) => {
    const response = await api.put(`/dotphathanh/${id}`, data);
    return response.data;
};

const remove = async (id) => {
    const response = await api.delete(`/dotphathanh/${id}`);
    return response.data;
};

const dotPhatHanhService = {
    getAll,
    getById,
    create,
    update,
    remove,
};

export default dotPhatHanhService;