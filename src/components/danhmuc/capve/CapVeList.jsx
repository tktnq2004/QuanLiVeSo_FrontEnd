import { useEffect, useMemo, useState } from 'react';

import capveService from '../../../services/capve.service';
import congtyxosoService from '../../../services/congtyxoso.service';

import CapVeModal from './CapVeModal';
import CapVeTable from './CapVeTable';
import CapVeSearch from './CapVeSearch';

import Button from '../../common/Button/Button';

const CapVeList = () => {

    const [capVes, setCapVes] = useState([]);

    const [congTys, setCompanies] = useState([]);

    const [selectedCapVe, setSelectedCapVe] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        MaCap: '',
        TenCap: '',
        MaCTXS: ''
    });

    // LOAD DATA
    const fetchDatas = async () => {

        try {

            setLoading(true);

            const [capVeData, congTyData] = await Promise.all([
                capveService.getAll(),
                congtyxosoService.getAll()
            ]);

            setCapVes(capVeData);

            setCompanies(congTyData);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchDatas();
    }, []);

    // FILTER DATA
    const filteredCapVes = useMemo(() => {
        return capVes.filter((item) => {

            return (
                item.MaCap
                    ?.toLowerCase()
                    .includes(filters.MaCap.toLowerCase())

                &&

                item.TenCap
                    ?.toLowerCase()
                    .includes(filters.TenCap.toLowerCase())

                &&

                (item.MaCTXS ?? '')
                    .toLowerCase()
                    .includes(filters.MaCTXS.toLowerCase())
            );
        });
    }, [capVes, filters]);

    // HANDLE FILTER
    const handleFilterChange = (event) => {

        const { name, value } = event.target;

        setFilters((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // ADD
    const handleAdd = () => {

        setSelectedCapVe(null);

        setShowModal(true);
    };

    // EDIT
    const handleEdit = (item) => {

        setSelectedCapVe(item);

        setShowModal(true);
    };

    // DELETE
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            'Bạn có chắc muốn xóa?'
        );

        if (!confirmDelete) return;

        try {

            await capveService.remove(id);

            await fetchDatas();

        } catch (err) {

            console.log(err);

        }
    };

    // SAVE SUCCESS
    const handleSuccess = async () => {

        setShowModal(false);

        setSelectedCapVe(null);

        await fetchDatas();
    };

    // CLOSE MODAL
    const handleCloseModal = () => {

        setShowModal(false);

        setSelectedCapVe(null);
    };

    return (
        <>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}
            >

                <Button onClick={handleAdd}>
                    Add Vé Số
                </Button>

            </div>

            <CapVeSearch
                filters={filters}
                onFilterChange={handleFilterChange}
            />

            {
                loading ? (
                    <p>Loading...</p>
                ) : (
                    <CapVeTable
                        capVes={filteredCapVes}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )
            }

            {
                showModal && (
                    <CapVeModal
                        congTys={congTys}
                        selectedCapVe={selectedCapVe}
                        onClose={handleCloseModal}
                        onSuccess={handleSuccess}
                    />
                )
            }

        </>
    );
};

export default CapVeList;

