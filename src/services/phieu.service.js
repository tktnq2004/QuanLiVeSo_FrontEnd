import api from '../api/axios';

const getAll = async () => {
    const response = await api.get('/phieu');
    return response.data;
};

const getById = async (id) => {
    const response = await api.get(`/phieu/${id}`);
    return response.data;
};

const create = async (data) => {
    const response = await api.post('/phieu', data);
    return response.data;
};

const remove = async (id) => {
    const response = await api.put(`/phieu/${id}/remove`);
    return response.data;
};

const phieuService = {
    getAll,
    create,
    remove,
    getById,
};

export default phieuService;