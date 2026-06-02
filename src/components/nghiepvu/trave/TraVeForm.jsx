import { useState } from 'react';
import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';

const TraVeForm = ({ nhaCungCap, formData, onChange }) => {

    const [selectedNCC, setSelectedNCC] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(prev => ({ ...prev, [name]: value }));
    };

    const handleNCCChange = (e) => {
        const { value } = e.target;
        onChange(prev => ({ ...prev, MaDoiTac: value }));
        const found = nhaCungCap.find(item => item.MaDoiTac === value);
        setSelectedNCC(found || null);
    };

    return (
        <div className="trave-form">

            <Select
                label="Nhà cung cấp"
                name="MaDoiTac"
                value={formData.MaDoiTac}
                onChange={handleNCCChange}
                options={nhaCungCap}
                valueField="MaDoiTac"
                labelField="TenDoiTac"
            />

            <Input
                label="Mã đối tác"
                value={selectedNCC?.MaDoiTac || ''}
                disabled
            />

            <Input
                label="Địa chỉ"
                value={selectedNCC?.DiaChi || ''}
                disabled
            />

            <Input
                label="Điện thoại"
                value={selectedNCC?.DienThoai || ''}
                disabled
            />

            <Input
                label="Số tài khoản"
                value={selectedNCC?.SoTaiKhoan || ''}
                disabled
            />

            <Input
                label="Tên chủ sở hữu"
                value={selectedNCC?.TenChuSoHuu || ''}
                disabled
            />

            <Input
                label="Tên ngân hàng"
                value={selectedNCC?.TenNganHang || ''}
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
                value={selectedNCC?.SoCT || 'MỚI'}
                disabled
            />
        </div>
    );
};

export default TraVeForm;