import { useState } from 'react';
import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';

const BanVeForm = ({ khachHang, formData, onChange }) => {

    const [selectedKH, setSelectedKH] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(prev => ({ ...prev, [name]: value }));
    };

    const handleKHChange = (e) => {
        const { value } = e.target;
        onChange(prev => ({ ...prev, MaDoiTac: value }));
        const found = khachHang.find(item => item.MaDoiTac === value);
        setSelectedKH(found || null);
    };

    return (
        <div className="banve-form">

            <Select
                label="Khách hàng"
                name="MaDoiTac"
                value={formData.MaDoiTac}
                onChange={handleKHChange}
                options={khachHang}
                valueField="MaDoiTac"
                labelField="TenDoiTac"
            />

            <Input
                label="Mã đối tác"
                value={selectedKH?.MaDoiTac || ''}
                disabled
            />

            <Input
                label="Địa chỉ"
                value={selectedKH?.DiaChi || ''}
                disabled
            />

            <Input
                label="Điện thoại"
                value={selectedKH?.DienThoai || ''}
                disabled
            />

            <Input
                label="Số tài khoản"
                value={selectedKH?.SoTaiKhoan || ''}
                disabled
            />

            <Input
                label="Tên chủ sở hữu"
                value={selectedKH?.TenChuSoHuu || ''}
                disabled
            />

            <Input
                label="Tên ngân hàng"
                value={selectedKH?.TenNganHang || ''}
                disabled
            />

            <Input
                type="date"
                label="Ngày giao"
                name="NgayGiao"
                value={formData.NgayGiao}
                onChange={handleChange}
            />

            <Input
                label="Số CT"
                name="SoCT"
                value={formData.SoCT || ''}
                onChange={handleChange}
            />

        </div>
    );
};

export default BanVeForm;