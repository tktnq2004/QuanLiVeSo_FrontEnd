import api from '../api/axios';

const createPhieu = async (data) => {
    const response = await api.post('/socai', data);
    return response.data;
};

const deletePhieu = async (id) => {
    const response = await api.delete(`/socai/${id}`);
    return response.data;
};

const getAll = async () => {
    const response = await api.get('/socai');
    return response.data;
};

const getByPhieu = async (id) => {
    const response = await api.get(`/socai/${id}`);
    return response.data;
};

const getBaoCao = async (maDoiTac, params = {}) => {
    const response = await api.get(`/socai/baocao/${maDoiTac}`, { params });
    return response.data;
};

const getByLoai = async (loai) => {
    const response = await api.get(`/socai/loai/${loai}`);
    return response.data;
};
const getThongKe = async (loai) => {

    const response = await api.get(`/socai/thongke/${loai}`);
    return response.data;
};

const getLoiNhuan = async (params = {}) => {
    const response = await api.get('/socai/loinhuan', { params });
    return response.data;
};

const getCongNo = async (params = {}) => {
    const response = await api.get('/socai/congno', { params });
    return response.data;
};
const getChiTietCongNo = async (params = {}) => {
    const response = await api.get('/socai/chitietcongno', { params });
    return response.data;
};


const socaiService = {
    createPhieu,
    deletePhieu,
    getByPhieu,
    getBaoCao,
    getByLoai,
    getThongKe,
    getLoiNhuan,
    getCongNo,
    getChiTietCongNo,
    getAll,
    
};

export default socaiService;