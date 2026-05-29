import { useEffect, useMemo, useState } from 'react';

import socaiService from '../../../services/socai.service';
import doitacService from '../../../services/doitac.service';
import dotphathanhService from '../../../services/dotphathanh.service';

import TKChiTable from './TKChiTable';
import TKChiSearch from './TKChiSearch';
import Loading from '../../common/Loading/Loading';
import '../../../styles/thongkeSearch.scss';

import { toast } from 'react-toastify';

const TKChiList = () => {

    const [records, setRecords] = useState([]);
    const [doiTacs, setDoiTacs] = useState([]);
    const [kyXos, setKyXos] = useState([]);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        TuNgay: new Date().toISOString().split('T')[0],
        DenNgay: new Date().toISOString().split('T')[0],
        MaDoiTac: ''
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

            if (filters.MaDoiTac &&
                item.MaDoiTac !== filters.MaDoiTac) return false;
;

            return true;
        });
    }, [records, filters]);

    if (loading) return <Loading />;

    return (
        <div>

            <TKChiSearch
                filters={filters}
                onFilterChange={handleFilterChange}
                doiTacs={doiTacs}
                kyXos={kyXos}
            />

            <TKChiTable
                records={filteredRecords}
            />

        </div>
    );
};

export default TKChiList;