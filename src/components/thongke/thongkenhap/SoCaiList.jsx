import { useEffect, useState } from 'react';

import socaiService from '../../../services/socai.service';

import SoCaiTable from './SoCaiTable';
import SoCaiModal from './SoCaiModal';

import Button from '../../common/Button/Button';
import Loading from '../../common/Loading/Loading';

import { toast } from 'react-toastify';

const SoCaiList = () => {

    const [records, setRecords] = useState([]);

    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);

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

                <Button
                    onClick={() => setShowModal(true)}
                >
                    Add Sổ Cái
                </Button>
            </div>

            <SoCaiTable
                records={records}
                handleDelete={handleDelete}
            />



        </div>
    );
};

export default SoCaiList;