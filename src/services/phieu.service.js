import api from '../api/axios';

const getAll = async () => {
    return await api.get('/phieu');
    
};

const getById = async (id) => {
    return await api.get(`/phieu/${id}`);
}

const create = async (data) => {

    return await api.post(
        '/phieu',
        data
    );
};

const remove = async (id) => {
    return await api.put(
        `/phieu/${id}/remove`
    );
};

export default {
    getAll,
    create,
    remove
};