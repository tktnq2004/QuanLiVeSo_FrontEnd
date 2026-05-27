import { useEffect, useState } from 'react';

import chitienService from '../../../services/chitien.service';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Select from '../../common/Select/Select';

const initialState = {
    KhachHang: '',
    MaKH: '',
    NgayTao: new Date().toISOString().split('T')[0],
    SoTien: '',
    HTTT: '',
    DiaChi: '',
    SoCT: '',
    DienThoai: '',
    GhiChu: ''
};

const ChiTienForm = ({
    khachHangs,
    httts,
    selectedChiTien,
    onSuccess
}) => {

    const [formData, setFormData] = useState(initialState);

    const [loading, setLoading] = useState(false);

    // EDIT MODE
    useEffect(() => {

        if (selectedChiTien) {

            setFormData({
                ...selectedChiTien,

            });

        } else {

            setFormData(initialState);

        }

    }, [selectedChiTien]);

    // INPUT
    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // SUBMIT
    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            if (!formData.MaCap.trim()) {
                alert('Mã cặp vé không được để trống');
                return;
            }

            if (!formData.TenCap.trim()) {
                alert('Tên cặp vé không được để trống');
                return;
            }

            setLoading(true);

            if (selectedChiTien) {

                await chitienService.update(
                    formData.MaCap,
                    formData
                );

            } else {

                await chitienService.create(formData);

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

            <Select
                name="KhachHang"
                value={formData.KhachHang}
                onChange={handleChange}
                options={khachHangs}
                valueField="MaKH"
                labelField="TenKH"
            />

            <Input
                type="text"
                name="MaDoiTac"
                placeholder="Mã KH"
                value={formData.MaKH}
                onChange={handleChange}
                disabled={!!selectedChiTien}
            />

            <Select
                name="HTTT"
                value={formData.HTTT}
                onChange={handleChange}
                options={httts}
                valueField="MaHTTT"
                labelField="TenHTTT"
            />

            <Input
                type="date"
                label="Ngày giao"
                name="NgayTao"
                value={formData.NgayTao}
                onChange={handleChange}
            />

            <Input
                label="Địa chỉ"
                name="DiaChi"
                value={formData.DiaChi}
                onChange={handleChange}
                disabled
            />

            <Input
                label="Số tiền"
                name="SoTien"
                value={formData.SoTien}
                onChange={handleChange}
            />

            <Input
                label="Số CT"
                name="SoCT"
                value={formData.SoCT}
                onChange={handleChange}
                disabled
            />

            <Input
                label="Điện thoại"
                name="DienThoai"
                value={formData.DienThoai}
                onChange={handleChange}
                disabled
            />

            <Input
                label="Về Khoản"
                name="GhiChu"
                value={formData.GhiChu}
                onChange={handleChange}
                disabled
            />


            <Button
                type="submit"
                disabled={loading}
            >
                {
                    loading
                        ? 'Saving...'
                        : selectedChiTien
                            ? 'Update'
                            : 'Add'
                }
            </Button>

        </form>
    );
};

export default ChiTienForm;