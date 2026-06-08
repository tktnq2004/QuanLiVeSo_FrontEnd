import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import socaiService from '../../../services/socai.service';
import doitacService from '../../../services/doitac.service';
import dotphathanhService from '../../../services/dotphathanh.service';

import TKBanTable from './TKBanTable';
import TKBanSearch from './TKBanSearch';
import Loading from '../../common/Loading/Loading';
import GetWeekRange from '../../../utils/getWeekRange';

import '../../../styles/thongkeSearch.scss';

const TKBanList = () => {

    const [records, setRecords] = useState([]);
    const [doiTacs, setDoiTacs] = useState([]);
    const [kyXos, setKyXos] = useState([]);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        ...GetWeekRange(),
        MaDoiTac: '',
        MaKyXo: '',
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const [data, doiTacData, dotData] = await Promise.all([
                socaiService.getThongKe(2),    
                doitacService.getAll(),
                dotphathanhService.getAll(),
            ]);
            setRecords(data);
            setDoiTacs(doiTacData);
            setKyXos(dotData);
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
            if (filters.MaKyXo && item.MaKyXo !== filters.MaKyXo)
                return false;

            return true;
        });

    }, [records, filters]);

    if (loading) return <Loading />;

    return (
        <div>
            <TKBanSearch
                filters={filters}
                onFilterChange={handleFilterChange}
                doiTacs={doiTacs}
                kyXos={kyXos}
            />
            <TKBanTable records={filteredRecords} />
        </div>
    );
};

export default TKBanList;