import { useEffect, useState } from 'react';

import doitacService from '../../../services/doitac.service';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Select from '../../common/Select/Select';

const initialState = {
    MaDoiTac: '',
    TenDoiTac: '',
    MaNhom: '',
    PhanLoai: '',
    DiaChi: '',
    DienThoai: '',
    SoTaiKhoan: '',
    TenChuSoHuu: '',
    TenNganHang: '',
    NoDauKy: 0
};

const DoiTacForm = ({
    selectedDoiTac,
    nhoms,
    onSuccess
}) => {

    const [formData, setFormData] = useState(initialState);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (selectedDoiTac) {

            setFormData({
                ...selectedDoiTac
            });

        }

    }, [selectedDoiTac]);

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

            if (!formData.MaDoiTac.trim()) {

                alert('Mã đối tác không được để trống');

                return;
            }

            if (!formData.TenDoiTac.trim()) {

                alert('Tên đối tác không được để trống');

                return;
            }

            setLoading(true);

            if (selectedDoiTac) {

                await doitacService.update(
                    formData.MaDoiTac,
                    formData
                );

            } else {

                await doitacService.create(formData);

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
                name="MaDoiTac"
                placeholder="Mã đối tác"
                value={formData.MaDoiTac}
                onChange={handleChange}
                disabled={!!selectedDoiTac}
            />

            <Input
                name="TenDoiTac"
                placeholder="Tên đối tác"
                value={formData.TenDoiTac}
                onChange={handleChange}
            />

            <Select
                name="MaNhom"
                value={formData.MaNhom}
                onChange={handleChange}
                options={nhoms}
                valueField="MaNhom"
                labelField="TenNhom"
            />

            <Input
                name="PhanLoai"
                placeholder="Phân loại"
                value={formData.PhanLoai}
                onChange={handleChange}
            />

            <Input
                name="DiaChi"
                placeholder="Địa chỉ"
                value={formData.DiaChi}
                onChange={handleChange}
            />

            <Input
                name="DienThoai"
                placeholder="Điện thoại"
                value={formData.DienThoai}
                onChange={handleChange}
            />

            <Input
                name="SoTaiKhoan"
                placeholder="Số tài khoản"
                value={formData.SoTaiKhoan}
                onChange={handleChange}
            />

            <Input
                name="TenChuSoHuu"
                placeholder="Tên chủ sở hữu"
                value={formData.TenChuSoHuu}
                onChange={handleChange}
            />

            <Input
                name="TenNganHang"
                placeholder="Tên ngân hàng"
                value={formData.TenNganHang}
                onChange={handleChange}
            />

            <Input
                type="number"
                name="NoDauKy"
                placeholder="Nợ đầu kỳ"
                value={formData.NoDauKy}
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
                            : selectedDoiTac
                                ? 'Update'
                                : 'Add'
                    }
                </Button>

            </div>

        </form>
    );
};

export default DoiTacForm;