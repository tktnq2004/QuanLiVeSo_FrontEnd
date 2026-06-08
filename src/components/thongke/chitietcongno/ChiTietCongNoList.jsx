import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';

import socaiService from '../../../services/socai.service';
import doitacService from '../../../services/doitac.service';

import ChiTietCongNoTable from './ChiTietCongNoTable';
import ChiTietCongNoSearch from './ChiTietCongNoSearch';
import Loading from '../../common/Loading/Loading';
import getWeekRange from '../../../utils/getWeekRange';

import '../../../styles/thongkeSearch.scss';


const ChiTietCongNoList = () => {

    const [records, setRecords] = useState([]);
    const [doiTacs, setDoiTacs] = useState([]);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        ...getWeekRange(),
        maDoiTac: 'tatCa',
    });

    useEffect(() => {
        const fetchDoiTac = async () => {
            try {
                const data = await doitacService.getAll();
                setDoiTacs(data);
            } catch (err) {
                toast.error('Không thể tải danh sách đối tác');
            }
        };
        fetchDoiTac();
    }, []);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await socaiService.getChiTietCongNo(filters);
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
            <ChiTietCongNoSearch
                filters={filters}
                onFilterChange={handleFilterChange}
                doiTacs={doiTacs}
            />

            {records.length === 0
                ? <p>Không có dữ liệu</p>
                : <ChiTietCongNoTable records={records} />
            }
        </div>
    );
};

export default ChiTietCongNoList;