import { useState, useEffect } from 'react';

import nhomService from '../../../services/nhom.service';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

const NhomForm = ({ selectedNhom, onSuccess }) => {

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        STT: '',
        MA_NHOM: '',
        TEN_NHOM: ''
    });

    // EDIT MODE
    useEffect(() => {
        if (selectedNhom) {
            setFormData(selectedNhom);
        } else {
            setFormData({ STT: '', MA_NHOM: '', TEN_NHOM: '' });
        }
    }, [selectedNhom]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            if (!formData.MA_NHOM.trim()) {
                alert('Mã nhóm không được để trống');
                return;
            }

            if (!formData.TEN_NHOM.trim()) {
                alert('Tên nhóm không được để trống');
                return;
            }

            setLoading(true);

            if (selectedNhom) {
                await nhomService.update(
                    formData.MA_NHOM,
                    {
                        STT: formData.STT,
                        TEN_NHOM: formData.TEN_NHOM
                    }
                );
            } else {
                await nhomService.create(formData);
            }

            setFormData({ STT: '', MA_NHOM: '', TEN_NHOM: '' });

            onSuccess();

        } catch (err) {
            alert(err?.response?.data?.message || 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <Input
                type="number"
                name="STT"
                placeholder="STT"
                value={formData.STT}
                onChange={handleChange}
            />

            <Input
                name="MA_NHOM"
                placeholder="Mã nhóm"
                value={formData.MA_NHOM}
                onChange={handleChange}
                disabled={!!selectedNhom}
            />

            <Input
                name="TEN_NHOM"
                placeholder="Tên nhóm"
                value={formData.TEN_NHOM}
                onChange={handleChange}
            />

            <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : selectedNhom ? 'Update' : 'Add'}
            </Button>

        </form>
    );
};

export default NhomForm;