import { useEffect, useState } from 'react';

import socaiService   from '../../../services/socai.service';
import doitacService  from '../../../services/doitac.service';
import htttService    from '../../../services/hinhthucthanhtoan.service';

import ThuTienModal from './ThuTienModal';
import ThuTienTable from './ThuTienTable';
import Button       from '../../common/Button/Button';

const LOAI_THU_TIEN = 5;

const ThuTienList = () => {

    const [thuTiens,    setThuTiens]    = useState([]);
    const [khachHangs,  setKhachHangs]  = useState([]);
    const [httts,       setHttts]       = useState([]);
    const [selectedThuTien, setSelectedThuTien] = useState(null);
    const [showModal,   setShowModal]   = useState(false);
    const [loading,     setLoading]     = useState(false);

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

    const handleAdd = () => {
        setSelectedThuTien(null);
        setShowModal(true);
    };

    const handleEdit = (item) => {
        setSelectedThuTien(item);
        setShowModal(true);
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
        setShowModal(false);
        setSelectedThuTien(null);
        await fetchData();
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedThuTien(null);
    };

    return (
        <div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Button onClick={handleAdd}>Thêm thu tiền</Button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ThuTienTable
                    thuTiens={thuTiens}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {showModal && (
                <ThuTienModal
                    khachHangs={khachHangs}
                    httts={httts}
                    selectedThuTien={selectedThuTien}
                    onClose={handleClose}
                    onSuccess={handleSuccess}
                />
            )}

        </div>
    );
};

export default ThuTienList;