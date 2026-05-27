import { useEffect, useState } from 'react';

import phieuService from '../../../services/phieu.service';

import doitacService from '../../../services/doitac.service';
import dotphathanhService from '../../../services/dotphathanh.service';
import hinhthucthanhtoanService from '../../../services/hinhthucthanhtoan.service';

import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';
import Button from '../../common/Button/Button';

import { toast } from 'react-toastify';

const initialDetail = {
    MaDot: '',
    SoLuong: 0,
    DonGia: 0,
    ThanhTien: 0,
    TienTra: 0,
    GhiChu: ''
};

const PhieuForm = ({
    onSuccess
}) => {

    const [doiTacs, setDoiTacs] = useState([]);

    const [dotPhatHanhs, setDotPhatHanhs] = useState([]);

    const [hinhThucs, setHinhThucs] = useState([]);

    const [formData, setFormData] = useState({

        NgayGiao: '',
        MaDoiTac: '',
        Loai: '',
        LoaiChiTiet: '',
        SoCT: '',
        MaHT: '',
        GhiChu: '',

        ChiTietSoCai: [
            initialDetail
        ]
    });

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = async () => {

        try {

            const [
                doiTacData,
                dotData,
                htData
            ] = await Promise.all([

                doitacService.getAll(),
                dotphathanhService.getAll(),
                hinhthucthanhtoanService.getAll()
            ]);

            setDoiTacs(doiTacData);

            setDotPhatHanhs(dotData);

            setHinhThucs(htData);

        } catch (err) {

            toast.error('Không thể tải dữ liệu');
        }
    };

    const handleChange = (event) => {

        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const handleDetailChange = (
        index,
        field,
        value
    ) => {

        const updatedDetails = [
            ...formData.ChiTietSoCai
        ];

        updatedDetails[index][field] = value;

        updatedDetails[index].ThanhTien =
            Number(updatedDetails[index].SoLuong || 0)
            *
            Number(updatedDetails[index].DonGia || 0);

        setFormData(prev => ({
            ...prev,
            ChiTietSoCai: updatedDetails
        }));
    };

    const addDetailRow = () => {

        setFormData(prev => ({

            ...prev,

            ChiTietSoCai: [
                ...prev.ChiTietSoCai,
                initialDetail
            ]
        }));
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            await phieuService.create(formData);

            toast.success('Tạo phiếu thành công');

            onSuccess();

        } catch (err) {

            toast.error(
                err?.response?.data?.message ||
                'Có lỗi xảy ra'
            );
        }
    };

    return (

        <form onSubmit={handleSubmit}>

            <Input
                type="date"
                name="NgayGiao"
                value={formData.NgayGiao}
                onChange={handleChange}
            />

            <Select
                name="MaDoiTac"
                value={formData.MaDoiTac}
                onChange={handleChange}
                options={doiTacs}
                valueField="MaDoiTac"
                labelField="TenDoiTac"
            />

            <Input
                name="Loai"
                placeholder="Loại"
                value={formData.Loai}
                onChange={handleChange}
            />

            <Input
                name="LoaiChiTiet"
                placeholder="Loại chi tiết"
                value={formData.LoaiChiTiet}
                onChange={handleChange}
            />

            <Input
                name="SoCT"
                placeholder="Số chứng từ"
                value={formData.SoCT}
                onChange={handleChange}
            />

            <Select
                name="MaHT"
                value={formData.MaHT}
                onChange={handleChange}
                options={hinhThucs}
                valueField="MaHT"
                labelField="TenHT"
            />

            <Input
                name="GhiChu"
                placeholder="Ghi chú"
                value={formData.GhiChu}
                onChange={handleChange}
            />

            <hr />

            <h3>Chi tiết sổ cái</h3>

            {
                formData.ChiTietSoCai.map((item, index) => (

                    <div
                        key={index}
                        style={{
                            border: '1px solid #ccc',
                            padding: '10px',
                            marginBottom: '10px'
                        }}
                    >

                        <Select
                            value={item.MaDot}
                            onChange={(e) =>
                                handleDetailChange(
                                    index,
                                    'MaDot',
                                    e.target.value
                                )
                            }
                            options={dotPhatHanhs}
                            valueField="MaDot"
                            labelField="DienGiai"
                        />

                        <Input
                            type="number"
                            placeholder="Số lượng"
                            value={item.SoLuong}
                            onChange={(e) =>
                                handleDetailChange(
                                    index,
                                    'SoLuong',
                                    e.target.value
                                )
                            }
                        />

                        <Input
                            type="number"
                            placeholder="Đơn giá"
                            value={item.DonGia}
                            onChange={(e) =>
                                handleDetailChange(
                                    index,
                                    'DonGia',
                                    e.target.value
                                )
                            }
                        />

                        <Input
                            type="number"
                            value={item.ThanhTien}
                            readOnly
                        />

                    </div>
                ))
            }

            <Button
                type="button"
                onClick={addDetailRow}
            >
                Thêm dòng
            </Button>

            <Button type="submit">
                Lưu phiếu
            </Button>

        </form>
    );
};

export default PhieuForm;