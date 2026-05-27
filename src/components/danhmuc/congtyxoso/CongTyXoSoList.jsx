import { useEffect, useMemo, useState } from 'react';  // thêm useMemo

import congtyxosoService from '../../../services/congtyxoso.service';

import CongTyXoSoModal from './CongTyXoSoModal';
import CongTyXoSoTable from './CongTyXoSoTable';
import CongTyXoSoSearch from './CongTyXoSoSearch';

import Button from '../../common/Button/Button';

const CongTyXoSoList = () => {

    const [congtyxosos, setCongTyXoSos] = useState([]);
    const [selectedCongty, setSelectedCongty] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // THÊM filter state
    const [filters, setFilters] = useState({
        MaCTXS: '',
        TenCTXS: ''
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await congtyxosoService.getAll();
            setCongTyXoSos(data);
        } catch (err) {
            // alert(err?.response?.data?.message || 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // THÊM filter logic
    const filteredCongTys = useMemo(() => {
        return congtyxosos.filter((item) =>
            item.MaCTXS
                ?.toLowerCase()
                .includes(filters.MaCTXS.toLowerCase())
            &&
            item.TenCTXS
                ?.toLowerCase()
                .includes(filters.TenCTXS.toLowerCase())
        );
    }, [congtyxosos, filters]);

    // THÊM handler
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleAdd = () => {
        setSelectedCongty(null);
        setShowModal(true);
    };

    const handleEdit = (item) => {
        setSelectedCongty(item);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Bạn có chắc muốn xóa?');
        if (!confirmDelete) return;
        try {
            await congtyxosoService.remove(id);
            await fetchData();
        } catch (err) {
            alert(err?.response?.data?.message || 'Có lỗi xảy ra');
        }
    };

    const handleSuccess = async () => {
        setShowModal(false);
        setSelectedCongty(null);
        await fetchData();
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCongty(null);
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
                    Add Công Ty Xổ Số
                </Button>
            </div>

            {/* THÊM Search */}
            <CongTyXoSoSearch
                filters={filters}
                onFilterChange={handleFilterChange}
            />

            {
                loading ? (
                    <p>Loading...</p>
                ) : (
                    <CongTyXoSoTable
                        congtyxosos={filteredCongTys}  // đổi từ congtyxosos → filteredCongTys
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )
            }

            {
                showModal && (
                    <CongTyXoSoModal
                        selectedCongty={selectedCongty}
                        onClose={handleCloseModal}
                        onSuccess={handleSuccess}
                    />
                )
            }

        </div>
    );
};

export default CongTyXoSoList;