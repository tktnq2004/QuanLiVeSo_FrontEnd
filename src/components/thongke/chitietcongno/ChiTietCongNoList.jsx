import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import socaiService  from '../../../services/socai.service';
import doitacService from '../../../services/doitac.service';

import ChiTietCongNoTable  from './ChiTietCongNoTable';
import ChiTietCongNoSearch from './ChiTietCongNoSearch';
import Loading               from '../../common/Loading/Loading';

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

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await socaiService.getChiTietCongNo(filters);
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
        filters.maDoiTac,
    ]);

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