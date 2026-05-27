import { useEffect, useMemo, useState } from 'react'; // thêm useMemo

import doitacService from '../../../services/doitac.service';
import nhomService from '../../../services/nhom.service';

import DoiTacModal from './DoiTacModal';
import DoiTacTable from './DoiTacTable';
import DoiTacSearch from './DoiTacSearch'; // thêm

import Button from '../../common/Button/Button';

const DoiTacList = () => {

    const [doiTacs, setDoiTacs] = useState([]);
    const [nhoms, setNhoms] = useState([]);
    const [selectedDoiTac, setSelectedDoiTac] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // THÊM
    const [filters, setFilters] = useState({
        MaDoiTac: '',
        TenDoiTac: '',
        TenNhom: '',
        PhanLoai: ''
    });

    const loadData = async () => {
        try {
            setLoading(true);
            const [doiTacData, nhomData] = await Promise.all([
                doitacService.getAll(),
                nhomService.getAll()
            ]);
            setDoiTacs(doiTacData);
            setNhoms(nhomData);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // THÊM
    const filteredDoiTacs = useMemo(() => {
        return doiTacs.filter((item) =>
            item.MaDoiTac
                ?.toLowerCase()
                .includes(filters.MaDoiTac.toLowerCase())
            &&
            item.TenDoiTac
                ?.toLowerCase()
                .includes(filters.TenDoiTac.toLowerCase())
            &&
            item.TenNhom
                ?.toLowerCase()
                .includes(filters.TenNhom.toLowerCase())
            &&
            item.PhanLoai
                ?.toLowerCase()
                .includes(filters.PhanLoai.toLowerCase())
        );
    }, [doiTacs, filters]);

    // THÊM
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleAdd = () => {
        setSelectedDoiTac(null);
        setShowModal(true);
    };

    const handleEdit = (item) => {
        setSelectedDoiTac(item);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Bạn có chắc muốn xóa?');
        if (!confirmDelete) return;
        try {
            await doitacService.remove(id);
            await loadData();
        } catch (err) {
            alert(err?.response?.data?.message || 'Không thể xóa');
        }
    };

    const handleSuccess = async () => {
        setShowModal(false);
        setSelectedDoiTac(null);
        await loadData();
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedDoiTac(null);
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
                    Add Đối Tác
                </Button>
            </div>

            {/* THÊM */}
            <DoiTacSearch
                filters={filters}
                onFilterChange={handleFilterChange}
            />

            {
                loading
                    ? <p>Loading...</p>
                    : (
                        <DoiTacTable
                            doiTacs={filteredDoiTacs} 
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )
            }

            {
                showModal && (
                    <DoiTacModal
                        selectedDoiTac={selectedDoiTac}
                        nhoms={nhoms}
                        onClose={handleClose}
                        onSuccess={handleSuccess}
                    />
                )
            }
        </div>
    );
};

export default DoiTacList;