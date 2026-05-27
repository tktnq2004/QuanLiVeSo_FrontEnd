import { useEffect, useState } from 'react';

import chitienService from '../../../services/chitien.service';
import doitacService from '../../../services/doitac.service';
import htttService from '../../../services/hinhthucthanhtoan.service';

import ChiTienModal from './ChiTienModal';
import ChiTienTable from './ChiTienTable';

import Button from '../../common/Button/Button';

const ChiTienList = () => {

    const [chiTiens, setChiTiens] = useState([]);

    const [khachHangs, setKhachHangs] = useState([]);

    const [httts, setHttts] = useState([]);

    const [selectedChiTien, setSelectedChiTien] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(false);

    // LOAD DATA
    const fetchDatas = async () => {

        try {

            setLoading(true);

            const [chiTienData, khachHangData, htttData] = await Promise.all([
                chitienService.getAll(),
                doitacService.getAll(),
                htttService.getAll()

            ]);

            setChiTiens(chiTienData);
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

        setSelectedChiTien(null);

        setShowModal(true);
    };

    // EDIT
    const handleEdit = (item) => {

        setSelectedChiTien(item);

        setShowModal(true);
    };

    // DELETE
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            'Bạn có chắc muốn xóa?'
        );

        if (!confirmDelete) return;

        try {

            await chitienService.remove(id);

            await fetchDatas();

        } catch (err) {

            console.log(err);

        }
    };

    // SAVE SUCCESS
    const handleSuccess = async () => {

        setShowModal(false);

        setSelectedChiTien(null);

        await fetchDatas();
    };

    // CLOSE MODAL
    const handleCloseModal = () => {

        setShowModal(false);

        setSelectedChiTien(null);
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
                    <ChiTienTable
                        chiTiens={chiTiens}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )
            }

            {
                showModal && (
                    <ChiTienModal
                        khachHangs={khachHangs}
                        httts={httts}
                        selectedChiTien={selectedChiTien}
                        onClose={handleCloseModal}
                        onSuccess={handleSuccess}
                    />
                )
            }

        </div>
    );
};

export default ChiTienList;

