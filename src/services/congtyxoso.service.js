import api from '../api/axios';

const getAll = async () => {
    const response = await api.get('/congtyxoso');
    return response.data;
};

const getById = async (id) => {
    const response = await api.get(`/congtyxoso/${id}`);
    return response.data;
}

const create = async (data) => {
    return await api.post('/congtyxoso', data);
};

const update = async (id, data) => {
    return await api.put(`/congtyxoso/${id}`, data);
};

const remove = async (id) => {
    return await api.delete(`/congtyxoso/${id}`);
};

export default {
    getAll,
    getById,
    create,
    update,
    remove
};