import { useEffect, useState } from 'react';

import phieuService from '../../../services/phieu.service';

import PhieuTable from './PhieuTable';

import Loading from '../../common/Loading/Loading';

import { toast } from 'react-toastify';

const PhieuList = () => {

    const [phieus, setPhieus] = useState([]);

    const [loading, setLoading] = useState(false);

    const fetchData = async () => {

        try {

            setLoading(true);

            const data = await phieuService.getAll();

            setPhieus(data);

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
            'Bạn có chắc muốn hủy phiếu?'
        );

        if (!confirmDelete) return;

        try {

            await phieuService.remove(id);

            toast.success('Hủy phiếu thành công');

            fetchData();

        } catch (err) {

            toast.error(
                err?.response?.data?.message ||
                'Không thể hủy phiếu'
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

            <PhieuTable
                phieus={phieus}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default PhieuList;