import { useEffect, useState } from 'react';

import socaiService from '../../../services/socai.service';

import Input  from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Select from '../../common/Select/Select';

const LOAI_THU_TIEN = 5;

const initialState = {
    MaDoiTac:  '',
    NgayGiao:  new Date().toISOString().split('T')[0],
    TienTra:   '',
    MaHT:      '',
    SoCT:      '',
    GhiChu:    '',
    DiaChi:    '',
    DienThoai: '',
};

const ThuTienForm = ({ khachHangs, httts, selectedThuTien, onSuccess }) => {

    const [formData, setFormData] = useState(initialState);
    const [loading,  setLoading]  = useState(false);

    useEffect(() => {
        if (selectedThuTien) {
            setFormData({
                MaDoiTac:  selectedThuTien.MaDoiTac  || '',
                NgayGiao:  selectedThuTien.NgayGiao?.split('T')[0] || '',
                TienTra:   selectedThuTien.TienTra    || '',
                MaHT:      selectedThuTien.MaHT       || '',
                SoCT:      selectedThuTien.SoCT       || '',
                GhiChu:    selectedThuTien.GhiChu     || '',
                DiaChi:    selectedThuTien.DiaChi     || '',
                DienThoai: selectedThuTien.DienThoai  || '',
            });
        } else {
            setFormData(initialState);
        }
    }, [selectedThuTien]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleKHChange = (e) => {
        const { value } = e.target;
        const found = khachHangs.find(kh => kh.MaDoiTac === value);
        setFormData(prev => ({
            ...prev,
            MaDoiTac:  value,
            DiaChi:    found?.DiaChi    || '',
            DienThoai: found?.DienThoai || '',
        }));
    };

    const handleSubmit = async () => {

        if (!formData.MaDoiTac) {
            alert('Vui lòng chọn khách hàng');
            return;
        }
        if (!formData.TienTra || Number(formData.TienTra) <= 0) {
            alert('Vui lòng nhập số tiền hợp lệ');
            return;
        }
        if (!formData.NgayGiao) {
            alert('Vui lòng chọn ngày giao');
            return;
        }

        try {
            setLoading(true);

            await socaiService.createPhieu({
                NgayGiao: formData.NgayGiao,
                MaDoiTac: formData.MaDoiTac,
                Loai:     LOAI_THU_TIEN,
                TienTra:  Number(formData.TienTra),
                MaHT:     formData.MaHT   || null,
                SoCT:     formData.SoCT   || null,
                GhiChu:   formData.GhiChu || null,
            });

            setFormData(initialState);
            if (onSuccess) onSuccess();

        } catch (err) {
            alert(err?.response?.data?.message || 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="thutien-form">

            <Select
                label="Khách hàng"
                name="MaDoiTac"
                value={formData.MaDoiTac}
                onChange={handleKHChange}
                options={khachHangs}
                valueField="MaDoiTac"
                labelField="TenDoiTac"
            />

            <Input
                label="Địa chỉ"
                value={formData.DiaChi}
                disabled
            />

            <Input
                label="Điện thoại"
                value={formData.DienThoai}
                disabled
            />

            <Select
                label="Hình thức thanh toán"
                name="MaHT"
                value={formData.MaHT}
                onChange={handleChange}
                options={httts}
                valueField="MaHT"
                labelField="TenHT"
            />

            <Input
                type="date"
                label="Ngày giao"
                name="NgayGiao"
                value={formData.NgayGiao}
                onChange={handleChange}
            />

            <Input
                label="Số tiền"
                name="TienTra"
                type="number"
                value={formData.TienTra}
                onChange={handleChange}
            />

            <Input
                label="Số CT"
                name="SoCT"
                value={formData.SoCT}
                onChange={handleChange}
            />

            <Input
                label="Ghi chú"
                name="GhiChu"
                value={formData.GhiChu}
                onChange={handleChange}
            />

            <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Đang lưu...' : 'Lưu'}
            </Button>

        </div>
    );
};

export default ThuTienForm;