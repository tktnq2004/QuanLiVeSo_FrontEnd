import { useEffect, useState } from 'react';

import socaiService from '../../../services/socai.service';
import doitacService from '../../../services/doitac.service';
import dotphathanhService from '../../../services/dotphathanh.service';

import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';
import Button from '../../common/Button/Button';
import FormRow from '../../common/Form/FormRow';

import { toast } from 'react-toastify';

const initialState = {
    MaDoiTac: '',
    MaDot: '',
    NgayGiao: '',
    Loai: 1,
    SoLuong: 0,
    DonGia: 0,
    TyLeThanhToan: 1,
    TienTra: 0,
    ThanhTien: 0,
    GhiChu: ''
};

const SoCaiForm = ({ onSuccess }) => {

    const [formData, setFormData] = useState(initialState);

    const [doiTacs, setDoiTacs] = useState([]);

    const [dotPhatHanhs, setDotPhatHanhs] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        try {

            const [doiTacData, dotData] = await Promise.all([
                doitacService.getAll(),
                dotphathanhService.getAll()
            ]);

            setDoiTacs(doiTacData);

            setDotPhatHanhs(dotData);

        } catch (err) {

            toast.error('Không thể tải dữ liệu');
        }
    };

    const handleChange = (event) => {

        const { name, value } = event.target;

        const updatedData = {
            ...formData,
            [name]: value
        };

        const soLuong = Number(updatedData.SoLuong || 0);

        const donGia = Number(updatedData.DonGia || 0);

        const tyLe = Number(updatedData.TyLeThanhToan || 1);

        updatedData.ThanhTien =
            soLuong * donGia * tyLe;

        setFormData(updatedData);
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            if (!formData.MaDoiTac) {
                toast.error('Chưa chọn đối tác');
                return;
            }

            if (!formData.MaDot) {
                toast.error('Chưa chọn đợt phát hành');
                return;
            }

            setLoading(true);

            await socaiService.create(formData);

            toast.success('Thêm sổ cái thành công');

            setFormData(initialState);

            onSuccess();

        } catch (err) {

            toast.error(
                err?.response?.data?.message ||
                'Có lỗi xảy ra'
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <form onSubmit={handleSubmit}>

            <FormRow>

                <Select
                    name="MaDoiTac"
                    value={formData.MaDoiTac}
                    onChange={handleChange}
                    options={doiTacs}
                    valueField="MaDoiTac"
                    labelField="TenDoiTac"
                />

                <Select
                    name="MaDot"
                    value={formData.MaDot}
                    onChange={handleChange}
                    options={dotPhatHanhs}
                    valueField="MaDot"
                    labelField="DienGiai"
                />

            </FormRow>

            <FormRow>

                <Input
                    type="date"
                    name="NgayGiao"
                    value={formData.NgayGiao}
                    onChange={handleChange}
                />

                <Select
                    name="Loai"
                    value={formData.Loai}
                    onChange={handleChange}
                    options={[
                        {
                            value: 1,
                            label: 'Cấp vé'
                        },
                        {
                            value: 2,
                            label: 'Trả vé'
                        }
                    ]}
                    valueField="value"
                    labelField="label"
                />

            </FormRow>

            <FormRow>

                <Input
                    type="number"
                    name="SoLuong"
                    placeholder="Số lượng"
                    value={formData.SoLuong}
                    onChange={handleChange}
                />

                <Input
                    type="number"
                    name="DonGia"
                    placeholder="Đơn giá"
                    value={formData.DonGia}
                    onChange={handleChange}
                />

            </FormRow>

            <FormRow>

                <Input
                    type="number"
                    step="0.01"
                    name="TyLeThanhToan"
                    placeholder="Tỷ lệ thanh toán"
                    value={formData.TyLeThanhToan}
                    onChange={handleChange}
                />

                <Input
                    type="number"
                    name="TienTra"
                    placeholder="Tiền trả"
                    value={formData.TienTra}
                    onChange={handleChange}
                />

            </FormRow>

            <Input
                type="number"
                name="ThanhTien"
                placeholder="Thành tiền"
                value={formData.ThanhTien}
                readOnly
            />

            <Input
                type="text"
                name="GhiChu"
                placeholder="Ghi chú"
                value={formData.GhiChu}
                onChange={handleChange}
            />

            <Button
                type="submit"
                disabled={loading}
            >
                {
                    loading
                        ? 'Saving...'
                        : 'Save'
                }
            </Button>

        </form>
    );
};

export default SoCaiForm;