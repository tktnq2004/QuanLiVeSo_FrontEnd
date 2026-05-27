import { useState, useEffect } from 'react';

import congtyxosoService from '../../../services/congtyxoso.service';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

const CongTyXoSoForm = ({
    selectedCongty,
    onSuccess,
}) => {

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        MaCTXS: '',
        TenCTXS: '',
        Dung: false
    });

    useEffect(() => {

        if (selectedCongty) {
            setFormData(selectedCongty);
        }

    }, [selectedCongty]);

    const handleChange = (event) => {

        const { name, value, type, checked } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox'
                ? checked
                : value
        }));
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            if (!formData.MaCTXS.trim()) {
                alert('Mã công ty không được để trống');
                return;
            }

            if (!formData.TenCTXS.trim()) {
                alert('Tên công ty không được để trống');
                return;
            }

            setLoading(true);

            if (selectedCongty) {

                await congtyxosoService.update(
                    formData.MaCTXS,
                    {
                        TenCTXS: formData.TenCTXS,
                        Dung: formData.Dung
                    }
                );

            } else {

                await congtyxosoService.create(formData);

            }

            setFormData({
                MaCTXS: '',
                TenCTXS: '',
                Dung: false
            });

            onSuccess();

        } catch (err) {

            alert(
                err?.response?.data?.message ||
                'Có lỗi xảy ra'
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <Input
                name="MaCTXS"
                placeholder="Mã công ty xổ số"
                value={formData.MaCTXS}
                onChange={handleChange}
                disabled={!!selectedCongty}
            />

            <Input
                name="TenCTXS"
                placeholder="Tên công ty xổ số"
                value={formData.TenCTXS}
                onChange={handleChange}
            />

            <label>
                <input
                    type="checkbox"
                    name="Dung"
                    checked={formData.Dung}
                    onChange={handleChange}
                />
                Ngưng sử dụng
            </label>

            <div
                style={{
                    display: 'flex',
                    gap: '10px',
                    marginTop: '10px'
                }}
            >

                <Button
                    type="submit"
                    disabled={loading}
                >
                    {
                        loading
                            ? 'Saving...'
                            : selectedCongty
                                ? 'Update'
                                : 'Add'
                    }
                </Button>

            </div>

        </form>
    );
};

export default CongTyXoSoForm;