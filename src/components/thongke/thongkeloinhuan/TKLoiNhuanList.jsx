import { useEffect, useMemo, useState } from 'react';

import socaiService from '../../../services/socai.service';
import doitacService from '../../../services/doitac.service';
import dotphathanhService from '../../../services/dotphathanh.service';

import TKLoiNhuanTable from './TKLoiNhuanTable';
import TKLoiNhuanSearch from './TKLoiNhuanSearch';
import Loading from '../../common/Loading/Loading';
import '../../../styles/thongkeSearch.scss';

import { toast } from 'react-toastify';

const TKLoiNhuanList = () => {

    const [records, setRecords] = useState([]);
    const [doiTacs, setDoiTacs] = useState([]);
    const [kyXos, setKyXos] = useState([]);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        TuNgay: new Date().toISOString().split('T')[0],
        DenNgay: new Date().toISOString().split('T')[0]
    });

    const fetchData = async () => {
        try {
            setLoading(true);

            const [data, doiTacData, kyXoData] = await Promise.all([
                socaiService.getAll(),
                doitacService.getAll(),
                dotphathanhService.getAll()
            ]);

            setRecords(data);
            setDoiTacs(doiTacData);
            setKyXos(kyXoData);

        } catch (err) {
            toast.error('Không thể tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredRecords = useMemo(() => {
        return records.filter(item => {

            const ngay = new Date(item.NgayGiao);

            const tuNgay = filters.TuNgay ? new Date(filters.TuNgay) : null;
            const denNgay = filters.DenNgay ? new Date(filters.DenNgay) : null;

            if (tuNgay && ngay < tuNgay) return false;
            if (denNgay && ngay > denNgay) return false;


            return true;
        });
    }, [records, filters]);

    if (loading) return <Loading />;

    return (
        <div>

            <TKLoiNhuanSearch
                filters={filters}
                onFilterChange={handleFilterChange}
                doiTacs={doiTacs}
                kyXos={kyXos}
            />

            <TKLoiNhuanTable
                records={filteredRecords}
            />

        </div>
    );
};

export default TKLoiNhuanList;