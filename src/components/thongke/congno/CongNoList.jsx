import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import socaiService from '../../../services/socai.service';

import CongNoTable  from './CongNoTable';
import CongNoSearch from './CongNoSearch';
import Loading        from '../../common/Loading/Loading';

import '../../../styles/thongkeSearch.scss';

const getWeekRange = () => {
    const today = new Date();
    const day   = today.getDay();
    const diffStart = day === 0 ? -6 : 1 - day;
    const start = new Date(today);
    start.setDate(today.getDate() + diffStart);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return {
        tuNgay:  start.toISOString().split('T')[0],
        denNgay: end.toISOString().split('T')[0],
    };
};

const CongNoList = () => {

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        ...getWeekRange(),
        phanLoai: 'tatCa',
        tinhTheo: 'ngayGiao',
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await socaiService.getCongNo(filters);
            setRecords(data);
        } catch (err) {
            toast.error('Không thể tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [
        filters.tuNgay,
        filters.denNgay,
        filters.phanLoai,
        filters.tinhTheo,
    ]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <Loading />;

    return (
        <div>
            <CongNoSearch
                filters={filters}
                onFilterChange={handleFilterChange}
            />
            <CongNoTable records={records} />
        </div>
    );
};

export default CongNoList;