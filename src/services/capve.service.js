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
    return  api.post('/capve', data);
};

const update = async (id, data) => {
    return api.put(`/capve/${id}`, data);
}

const remove = async (id) => {
    return api.delete(`/capve/${id}`);
};

export default {
    getAll,
    getById,
    create,
    update,
    remove
};