import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';

import socaiService from '../../../services/socai.service';

import TKLoiNhuanTable from './TKLoiNhuanTable';
import TKLoiNhuanSearch from './TKLoiNhuanSearch';
import Loading from '../../common/Loading/Loading';

import '../../../styles/thongkeSearch.scss';
import GetWeekRange from '../../../utils/getWeekRange';

const TKLoiNhuanList = () => {

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        ...GetWeekRange(),
    });

    const fetchData = useCallback(async () => {

        try {

            setLoading(true);

            const data = await socaiService.getLoiNhuan({
                tuNgay: filters.TuNgay,
                denNgay: filters.DenNgay,
            });

            setRecords(data);

        } catch (err) {

            toast.error('Không thể tải dữ liệu');

        } finally {

            setLoading(false);
        }

    }, [filters.TuNgay, filters.DenNgay]);

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
            <TKLoiNhuanSearch
                filters={filters}
                onFilterChange={handleFilterChange}
            />
            <TKLoiNhuanTable records={records} />
        </div>
    );
};

export default TKLoiNhuanList;