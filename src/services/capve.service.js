import api from '../api/axios';

const getAll = async () => {
    const response = await api.get('/capve');
    return response.data;
};

const getById = async (id) => {
    const response = await api.get(`/capve/${id}`);
    return response.data;
};

const create = async (data) => {
    const response = await api.post('/capve', data);
    return response.data;
};

const update = async (id, data) => {
    const response = await api.put(`/capve/${id}`, data);
    return response.data;
};

const remove = async (id) => {
    const response = await api.delete(`/capve/${id}`);
    return response.data;
};

const capVeService = {
    getAll,
    getById,
    create,
    update,
    remove,
};

export default capVeService;