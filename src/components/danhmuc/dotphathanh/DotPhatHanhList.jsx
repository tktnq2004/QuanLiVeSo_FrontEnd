import { useEffect, useMemo, useState } from 'react'; // thêm useMemo

import dotphathanhService from '../../../services/dotphathanh.service';
import capveService from '../../../services/capve.service';

import DotPhatHanhModal from './DotPhatHanhModal';
import DotPhatHanhTable from './DotPhatHanhTable';
import DotPhatHanhSearch from './DotPhatHanhSearch';

import Button from '../../common/Button/Button';

const DotPhatHanhList = () => {

    const [dotphathanhs, setDotPhatHanhs] = useState([]);
    const [capves, setCapves] = useState([]);
    const [selectedDot, setSelectedDot] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // thêm
    const [filters, setFilters] = useState({
        MaDot: '',
        TenCap: '',
        MaKyXo: ''
    });

    const loadData = async () => {
        try {
            setLoading(true);
            const [dotData, capData] = await Promise.all([
                dotphathanhService.getAll(),
                capveService.getAll()
            ]);
            setDotPhatHanhs(dotData);
            setCapves(capData);
        } catch (err) {
            // alert(err?.response?.data?.message || 'Có lỗi xảy ra'); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // thêm
    const filteredDots = useMemo(() => {
        return dotphathanhs.filter((item) =>
            item.MaDot
                ?.toLowerCase()
                .includes(filters.MaDot.toLowerCase())
            &&
            item.TenCap
                ?.toLowerCase()
                .includes(filters.TenCap.toLowerCase())
            &&
            item.MaKyXo
                ?.toLowerCase()
                .includes(filters.MaKyXo.toLowerCase())
        );
    }, [dotphathanhs, filters]);

    // thêm
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleAdd = () => {
        setSelectedDot(null);
        setShowModal(true);
    };

    const handleEdit = (item) => {
        setSelectedDot(item);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Bạn có chắc muốn xóa?');
        if (!confirmDelete) return;
        try {
            await dotphathanhService.remove(id);
            await loadData();
        } catch (err) {
            alert(err?.response?.data?.message || 'Không thể xóa');
        }
    };

    const handleSuccess = async () => {
        setShowModal(false);
        setSelectedDot(null);
        await loadData();
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedDot(null);
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <Button onClick={handleAdd}>
                    Add Đợt Phát Hành
                </Button>
            </div>

            {/* thêm */}
            <DotPhatHanhSearch
                filters={filters}
                onFilterChange={handleFilterChange}
            />

            {
                loading
                    ? <p>Loading...</p>
                    : (
                        <DotPhatHanhTable
                            dotphathanhs={filteredDots}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )
            }

            {
                showModal && (
                    <DotPhatHanhModal
                        selectedDot={selectedDot}
                        capves={capves}
                        onClose={handleClose}
                        onSuccess={handleSuccess}
                    />
                )
            }
        </div>
    );
};

export default DotPhatHanhList;