import api from '../api/axios';

const getAll = async () => {
    const response = await api.get('/doitac');
    return response.data;
};

const getById = async (id) => {
    const response = await api.get(`/doitac/${id}`);
    return response.data;
};

const create = async (data) => {
    const response = await api.post('/doitac', data);
    return response.data;
};

const update = async (id, data) => {
    const response = await api.put(`/doitac/${id}`, data);
    return response.data;
};

const remove = async (id) => {
    const response = await api.delete(`/doitac/${id}`);
    return response.data;
};

const getCongNo = async (id) => {
    const response = await api.get(`/doitac/${id}/congno`);
    return response.data;
};

const doiTacService = {
    getAll,
    getById,
    create,
    update,
    remove,
    getCongNo,
};

export default doiTacService;