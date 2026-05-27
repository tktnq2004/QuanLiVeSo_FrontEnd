import { useEffect, useState } from 'react';

import dotphathanhService from '../../../services/dotphathanh.service';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Select from '../../common/Select/Select';

const initialState = {
    MaDot: '',
    MaCap: '',
    NgayXo: '',
    MaKyXo: '',
    DienGiai: ''
};

const DotPhatHanhForm = ({
    selectedDot,
    capves,
    onSuccess,
}) => {

    const [formData, setFormData] = useState(initialState);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (selectedDot) {

            setFormData({
                MaDot: selectedDot.MaDot || '',
                MaCap: selectedDot.MaCap || '',
                NgayXo: selectedDot.NgayXo
                    ? selectedDot.NgayXo.split('T')[0]
                    : '',
                MaKyXo: selectedDot.MaKyXo || '',
                DienGiai: selectedDot.DienGiai || ''
            });

        }

    }, [selectedDot]);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            if (!formData.MaDot.trim()) {

                alert('Mã đợt không được để trống');

                return;
            }

            setLoading(true);

            if (selectedDot) {

                await dotphathanhService.update(
                    formData.MaDot,
                    formData
                );

            } else {

                await dotphathanhService.create(formData);

            }

            setFormData(initialState);

            if (onSuccess) {
                onSuccess();
            }

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
                name="MaDot"
                placeholder="Mã đợt phát hành"
                value={formData.MaDot}
                onChange={handleChange}
                disabled={!!selectedDot}
            />

            <Select
                name="MaCap"
                value={formData.MaCap}
                onChange={handleChange}
                options={capves}
                valueField="MaCap"
                labelField="TenCap"
            />

            <Input
                type="date"
                name="NgayXo"
                value={formData.NgayXo}
                onChange={handleChange}
            />

            <Input
                name="MaKyXo"
                placeholder="Mã kỳ xổ"
                value={formData.MaKyXo}
                onChange={handleChange}
            />

            <Input
                name="DienGiai"
                placeholder="Diễn giải"
                value={formData.DienGiai}
                onChange={handleChange}
            />

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
                            : selectedDot
                                ? 'Update'
                                : 'Add'
                    }
                </Button>

            </div>

        </form>
    );
};

export default DotPhatHanhForm;