import { useEffect, useState } from 'react';

import socaiService from '../../../services/socai.service';
import doitacService from '../../../services/doitac.service';
import htttService from '../../../services/hinhthucthanhtoan.service';

import ThuTienForm from './ThuTienForm';
import ThuTienTable from './ThuTienTable';
import './ThuTien.scss';

const LOAI_THU_TIEN = 5;

const ThuTienList = () => {

    const [thuTiens, setThuTiens] = useState([]);
    const [khachHangs, setKhachHangs] = useState([]);
    const [httts, setHttts] = useState([]);
    const [selectedThuTien, setSelectedThuTien] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [thuTienData, doiTacData, htttData] = await Promise.all([
                socaiService.getByLoai(LOAI_THU_TIEN),
                doitacService.getAll(),
                htttService.getAll(),
            ]);
            setThuTiens(thuTienData);
            setKhachHangs(doiTacData);
            setHttts(htttData);
        } catch (err) {
            alert(err?.response?.data?.message || 'Lỗi tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);


    const handleEdit = (item) => {
        setSelectedThuTien(item);
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
        setSelectedThuTien(null);
        await fetchData();
    };

    const handleClose = () => {
        setSelectedThuTien(null);
    };

    return (
        <>

            <ThuTienForm
                khachHangs={khachHangs}
                httts={httts}
                selectedThuTien={selectedThuTien}
                onClose={handleClose}
                onSuccess={handleSuccess}
            />

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ThuTienTable
                    thuTiens={thuTiens}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}



        </>
    );
};

export default ThuTienList;