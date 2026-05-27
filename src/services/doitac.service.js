import api from '../api/axios';

const getAll = async () => {
    const response = await api.get('/doitac');
    return response.data;
};

const getById = async (id) => {
    const response = await api.get(`/doitac/${id}`);
    return response.data;
}

const create = async (data) => {
    return await api.post('/doitac', data);
};

const update = async (id, data) => {
    return await api.put(`/doitac/${id}`, data);
};

const remove = async (id) => {
    return await api.delete(`/doitac/${id}`);
};

const getCongNo = async (id) => {
    const response = await api.get(`/doitac/${id}/congno`);
    return response.data;
}
export default {
    getAll,
    getById,
    create,
    update,
    remove,
    getCongNo
};