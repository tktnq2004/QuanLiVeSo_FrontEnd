import { useEffect, useState } from 'react';

import thutienService from '../../../services/thutien.service';
import doitacService from '../../../services/doitac.service';
import htttService from '../../../services/hinhthucthanhtoan.service';

import ThuTienModal from './ThuTienModal';
import ThuTienTable from './ThuTienTable';

import Button from '../../common/Button/Button';

const ThuTienList = () => {

    const [thuTiens, setThuTiens] = useState([]);

    const [khachHangs, setKhachHangs] = useState([]);

    const [httts, setHttts] = useState([]);

    const [selectedThuTien, setSelectedThuTien] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(false);

    // LOAD DATA
    const fetchDatas = async () => {

        try {

            setLoading(true);

            const [capVeData, khachHangData, htttData] = await Promise.all([
                thutienService.getAll(),
                doitacService.getAll(),
                htttService.getAll()

            ]);

            setThuTiens(capVeData);
            setHttts(htttData);
            setKhachHangs(khachHangData);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchDatas();
    }, []);


    // ADD
    const handleAdd = () => {

        setSelectedThuTien(null);

        setShowModal(true);
    };

    // EDIT
    const handleEdit = (item) => {

        setSelectedThuTien(item);

        setShowModal(true);
    };

    // DELETE
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            'Bạn có chắc muốn xóa?'
        );

        if (!confirmDelete) return;

        try {

            await thutienService.remove(id);

            await fetchDatas();

        } catch (err) {

            console.log(err);

        }
    };

    // SAVE SUCCESS
    const handleSuccess = async () => {

        setShowModal(false);

        setSelectedThuTien(null);

        await fetchDatas();
    };

    // CLOSE MODAL
    const handleCloseModal = () => {

        setShowModal(false);

        setSelectedThuTien(null);
    };

    return (
        <div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}
            >

                <Button onClick={handleAdd}>
                    Add chi tiền
                </Button>

            </div>

            {
                loading ? (
                    <p>Loading...</p>
                ) : (
                    <ThuTienTable
                        thuTiens={thuTiens}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )
            }

            {
                showModal && (
                    <ThuTienModal
                        khachHangs={khachHangs}
                        httts={httts}
                        selectedThuTien={selectedThuTien}
                        onClose={handleCloseModal}
                        onSuccess={handleSuccess}
                    />
                )
            }

        </div>
    );
};

export default ThuTienList;

