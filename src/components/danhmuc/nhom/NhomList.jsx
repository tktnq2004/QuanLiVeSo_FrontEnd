import { useEffect, useMemo, useState } from 'react';

import nhomService from '../../../services/nhom.service';

import NhomModal from './NhomModal';
import NhomTable from './NhomTable';
import NhomSearch from './NhomSearch';
import Button from '../../common/Button/Button';

const NhomList = () => {

    const [nhoms, setNhoms] = useState([]);
    const [selectedNhom, setSelectedNhom] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        MaNhom: '',
        TenNhom: ''
    });

    const fetchNhoms = async () => {
        try {
            setLoading(true);
            const data = await nhomService.getAll();
            setNhoms(data);
        } catch (err) {
            // alert(err?.response?.data?.message || 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNhoms();
    }, []);

    const filteredNhoms = useMemo(() => {
        return nhoms.filter((item) =>
            (item.MaNhom ?? '')
                .toLowerCase()
                .includes(filters.MaNhom.toLowerCase())
            &&
            (item.TenNhom ?? '')
                .toLowerCase()
                .includes(filters.TenNhom.toLowerCase())
        );
    }, [nhoms, filters]);
    
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleAdd = () => {
        setSelectedNhom(null);
        setShowModal(true);
    };

    const handleEdit = (item) => {
        setSelectedNhom(item);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Bạn có chắc muốn xóa?');
        if (!confirmDelete) return;
        try {
            await nhomService.remove(id);
            await fetchNhoms();
        } catch (err) {
            alert(err?.response?.data?.message || 'Không thể xóa');
        }
    };

    const handleSuccess = async () => {
        setShowModal(false);
        setSelectedNhom(null);
        await fetchNhoms();
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedNhom(null);
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
                    Add Nhóm
                </Button>
            </div>

            <NhomSearch
                filters={filters}
                onFilterChange={handleFilterChange}
            />

            {
                loading
                    ? <p>Loading...</p>
                    : (
                        <NhomTable
                            nhoms={filteredNhoms}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )
            }

            {
                showModal && (
                    <NhomModal
                        selectedNhom={selectedNhom}
                        onClose={handleClose}
                        onSuccess={handleSuccess}
                    />
                )
            }
        </div>
    );
};

export default NhomList;