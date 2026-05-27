import api from '../api/axios';

const getAll = async () => {
    const response = await api.get('/nhom');
    return response.data;
};

const getById = async (id) => {
    const response = await api.get(`/nhom/${id}`);
    return response.data;
};

const create = async (data) => {
    return await api.post('/nhom', data);
};

const update = async (id, data) => {
    return await api.put(`/nhom/${id}`, data);
};

const remove = async (id) => {
    return await api.delete(`/nhom/${id}`);
};

export default {
    getAll,
    getById,
    create,
    update,
    remove
};
