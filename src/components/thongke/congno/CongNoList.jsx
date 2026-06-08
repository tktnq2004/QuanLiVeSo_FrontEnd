import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';

import socaiService from '../../../services/socai.service';

import CongNoTable from './CongNoTable';
import CongNoSearch from './CongNoSearch';
import Loading from '../../common/Loading/Loading';
import GetWeekRange from '../../../utils/getWeekRange';
import '../../../styles/thongkeSearch.scss';

const CongNoList = () => {

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        ...GetWeekRange(),
        phanLoai: 'tatCa',
        tinhTheo: 'ngayGiao',
    });

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await socaiService.getCongNo(filters);
            setRecords(data);
        } catch (err) {
            toast.error('Không thể tải dữ liệu');
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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