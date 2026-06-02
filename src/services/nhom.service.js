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
    const response = await api.post('/nhom', data);
    return response.data;
};

const update = async (id, data) => {
    const response = await api.put(`/nhom/${id}`, data);
    return response.data;
};

const remove = async (id) => {
    const response = await api.delete(`/nhom/${id}`);
    return response.data;
};

const nhomService = {
    getAll,
    getById,
    create,
    update,
    remove,
};

export default nhomService;