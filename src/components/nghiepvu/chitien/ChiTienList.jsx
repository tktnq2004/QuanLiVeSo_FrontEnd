import { useEffect, useState } from 'react';

import socaiService from '../../../services/socai.service';
import doitacService from '../../../services/doitac.service';
import htttService from '../../../services/hinhthucthanhtoan.service';

import ChiTienForm from './ChiTienForm';
import ChiTienTable from './ChiTienTable';

import './ChiTien.scss';

const LOAI_CHI_TIEN = 6;

const ChiTienList = () => {

    const [chiTiens, setChiTiens] = useState([]);
    const [doiTacs, setDoiTacs] = useState([]);
    const [httts, setHttts] = useState([]);
    const [selectedChiTien, setSelectedChiTien] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [chiTienData, doiTacData, htttData] = await Promise.all([
                socaiService.getByLoai(LOAI_CHI_TIEN),
                doitacService.getAll(),
                htttService.getAll(),
            ]);
            setChiTiens(chiTienData);
            setDoiTacs(doiTacData);
            setHttts(htttData);
        } catch (err) {
            alert(err?.response?.data?.message || 'Lỗi tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleEdit = (item) => {
        setSelectedChiTien(item);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc muốn xóa?')) return;
        try {
            await socaiService.deletePhieu(id);
            await fetchData();
        } catch (err) {
            alert(err?.response?.data?.message || 'Không thể xóa');
        }
    };

    const handleSuccess = async () => {
        setSelectedChiTien(null);
        await fetchData();
    };

    const handleClose = () => {
        setSelectedChiTien(null);
    };

    return (
        <>

            <ChiTienForm
                doiTacs={doiTacs}
                httts={httts}
                selectedChiTien={selectedChiTien}
                onClose={handleClose}
                onSuccess={handleSuccess}
            />

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ChiTienTable
                    chiTiens={chiTiens}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}


        </>
    );
};

export default ChiTienList;