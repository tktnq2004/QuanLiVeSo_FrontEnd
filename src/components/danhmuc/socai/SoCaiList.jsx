import { useEffect, useState } from 'react';

import socaiService from '../../../services/socai.service';

import SoCaiTable from './SoCaiTable';

import Loading from '../../common/Loading/Loading';

import { toast } from 'react-toastify';

const SoCaiList = () => {

    const [records, setRecords] = useState([]);

    const [loading, setLoading] = useState(false);

    const fetchData = async () => {

        try {

            setLoading(true);

            const data = await socaiService.getAll();

            setRecords(data);

        } catch (err) {

            toast.error('Không thể tải dữ liệu');

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            'Bạn có chắc muốn xóa?'
        );

        if (!confirmDelete) return;

        try {

            await socaiService.remove(id);

            toast.success('Đã xóa');

            fetchData();

        } catch (err) {

            toast.error(
                err?.response?.data?.message ||
                'Không thể xóa'
            );
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (

        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}
            >
            </div>

            <SoCaiTable
                records={records}
                handleDelete={handleDelete}
            />

            

        </div>
    );
};

export default SoCaiList;