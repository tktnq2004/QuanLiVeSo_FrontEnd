import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import socaiService from '../../../services/socai.service';
import doitacService from '../../../services/doitac.service';
import htttService from '../../../services/hinhthucthanhtoan.service';

import TKThuTable from './TKThuTable';
import TKThuSearch from './TKThuSearch';
import Loading from '../../common/Loading/Loading';
import GetWeekRange from '../../../untils/getWeekRange';

import '../../../styles/thongkeSearch.scss';

const TKThuList = () => {
    const [filters, setFilters] = useState({
        ...GetWeekRange(),
        MaDoiTac: '',
        MaHT: '',
    });

    const [records, setRecords] = useState([]);
    const [doiTacs, setDoiTacs] = useState([]);
    const [httts, setHttts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [data, doiTacData, htttData] = await Promise.all([
                socaiService.getByLoai(5),
                doitacService.getAll(),
                htttService.getAll(),
            ]);
            setRecords(data);
            setDoiTacs(doiTacData);
            setHttts(htttData);
        } catch (err) {
            toast.error('Không thể tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredRecords = useMemo(() => {

        return records.filter(item => {

            const ngay = item.NgayGiao?.split('T')[0];

            if (filters.TuNgay && ngay < filters.TuNgay)
                return false;
            if (filters.DenNgay && ngay > filters.DenNgay)
                return false;
            if (filters.MaDoiTac && item.MaDoiTac !== filters.MaDoiTac)
                return false;
            if (filters.MaHT && item.MaHT !== filters.MaHT)
                return false;

            return true;
        });

    }, [records, filters]);

    if (loading) return <Loading />;

    return (
        <div>
            <TKThuSearch
                filters={filters}
                onFilterChange={handleFilterChange}
                doiTacs={doiTacs}
                httts={httts}
            />
            <TKThuTable records={filteredRecords} />
        </div>
    );
};

export default TKThuList;