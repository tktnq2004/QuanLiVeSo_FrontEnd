import { useEffect, useState } from 'react';

import socaiService from '../../../services/socai.service';

import Input  from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Select from '../../common/Select/Select';

const LOAI_CHI_TIEN = 6;

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

const ChiTienForm = ({ doiTacs, httts, selectedChiTien, onSuccess }) => {

    const [formData, setFormData] = useState(initialState);
    const [loading,  setLoading]  = useState(false);

    useEffect(() => {
        if (selectedChiTien) {
            setFormData({
                MaDoiTac:  selectedChiTien.MaDoiTac  || '',
                NgayGiao:  selectedChiTien.NgayGiao?.split('T')[0] || '',
                TienTra:   selectedChiTien.TienTra    || '',
                MaHT:      selectedChiTien.MaHT       || '',
                SoCT:      selectedChiTien.SoCT       || '',
                GhiChu:    selectedChiTien.GhiChu     || '',
                DiaChi:    selectedChiTien.DiaChi     || '',
                DienThoai: selectedChiTien.DienThoai  || '',
            });
        } else {
            setFormData(initialState);
        }
    }, [selectedChiTien]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDoiTacChange = (e) => {
        const { value } = e.target;
        const found = doiTacs.find(dt => dt.MaDoiTac === value);
        setFormData(prev => ({
            ...prev,
            MaDoiTac:  value,
            DiaChi:    found?.DiaChi    || '',
            DienThoai: found?.DienThoai || '',
        }));
    };

    const handleSubmit = async () => {

        if (!formData.MaDoiTac) {
            alert('Vui lòng chọn đối tác');
            return;
        }
        if (!formData.TienTra || Number(formData.TienTra) <= 0) {
            alert('Vui lòng nhập số tiền hợp lệ');
            return;
        }
        if (!formData.NgayGiao) {
            alert('Vui lòng chọn ngày');
            return;
        }

        try {
            setLoading(true);

            await socaiService.createPhieu({
                NgayGiao: formData.NgayGiao,
                MaDoiTac: formData.MaDoiTac,
                Loai:     LOAI_CHI_TIEN,
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
        <div className="chitien-form">

            <Select
                label="Đối tác"
                name="MaDoiTac"
                value={formData.MaDoiTac}
                onChange={handleDoiTacChange}
                options={doiTacs}
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
                label="Ngày"
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
                label="Số chứng từ"
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

export default ChiTienForm;