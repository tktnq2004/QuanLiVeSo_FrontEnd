import Input from "../../common/Input/Input";
import Select from "../../common/Select/Select";
import { useState } from "react";

const TraVeForm = ({ dotPhatHanh, nhaCungCap, formData, onChange }) => {

    const [selectedNCC, setSelectedNCC] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(prev => ({ ...prev, [name]: value }));
    };

    const handleNCCChange = (e) => {
        const { value } = e.target;

        onChange(prev => ({ ...prev, MaNCC: value }));

        const found = nhaCungCap.find((item) => item.MaDoiTac === value);
        setSelectedNCC(found || null);
    };

    return (
        <form className="trave-form">

            <Select
                label="Nhà cung cấp"
                name="MaNCC"
                value={formData.MaNCC}
                onChange={handleNCCChange}
                options={nhaCungCap}
                valueField="MaDoiTac"
                labelField="TenDoiTac"
            />

            <Input
                label="Mã nhà cung cấp"
                value={selectedNCC?.MaNCC || ''}
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
                name="NgayTao"
                value={formData.NgayTao}
                onChange={handleChange}
            />

        </form>
    );
};

export default TraVeForm;