import { useEffect, useState } from 'react';

import socaiService  from '../../../services/socai.service';
import doitacService from '../../../services/doitac.service';
import htttService   from '../../../services/hinhthucthanhtoan.service';

import ChiTienModal from './ChiTienModal';
import ChiTienTable from './ChiTienTable';
import Button       from '../../common/Button/Button';

const LOAI_CHI_TIEN = 6;

const ChiTienList = () => {

    const [chiTiens,       setChiTiens]       = useState([]);
    const [doiTacs,        setDoiTacs]        = useState([]);
    const [httts,          setHttts]          = useState([]);
    const [selectedChiTien, setSelectedChiTien] = useState(null);
    const [showModal,      setShowModal]      = useState(false);
    const [loading,        setLoading]        = useState(false);

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

    const handleAdd = () => {
        setSelectedChiTien(null);
        setShowModal(true);
    };

    const handleEdit = (item) => {
        setSelectedChiTien(item);
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
        setSelectedChiTien(null);
        await fetchData();
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedChiTien(null);
    };

    return (
        <div>

            <div style={{ marginBottom: '20px' }}>
                <Button onClick={handleAdd}>Thêm chi tiền</Button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ChiTienTable
                    chiTiens={chiTiens}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {showModal && (
                <ChiTienModal
                    doiTacs={doiTacs}
                    httts={httts}
                    selectedChiTien={selectedChiTien}
                    onClose={handleClose}
                    onSuccess={handleSuccess}
                />
            )}

        </div>
    );
};

export default ChiTienList;