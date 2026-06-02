import api from '../api/axios';

const getAll = async () => {
    const response = await api.get('/congtyxoso');
    return response.data;
};

const getById = async (id) => {
    const response = await api.get(`/congtyxoso/${id}`);
    return response.data;
};

const create = async (data) => {
    const response = await api.post('/congtyxoso', data);
    return response.data;
};

const update = async (id, data) => {
    const response = await api.put(`/congtyxoso/${id}`, data);
    return response.data;
};

const remove = async (id) => {
    const response = await api.delete(`/congtyxoso/${id}`);
    return response.data;
};

const congTyXoSoService = {
    getAll,
    getById,
    create,
    update,
    remove,
};

export default congTyXoSoService;