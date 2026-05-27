import { useState } from 'react';

import hinhthucthanhtoanService from '../../services/hinhthucthanhtoan.service';

import Input from '../common/Input/Input';
import Button from '../common/Button/Button';

const HinhThucThanhToanForm = ({ onSuccess }) => {

    const [formData, setFormData] = useState({
        STT: '',
        MA_NGHE: '',
        TEN_NGHE: ''
    });

    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            await hinhthucthanhtoanService.create(formData);

            setFormData({
                STT: '',
                MA_NGHE: '',
                TEN_NGHE: ''
            });

            onSuccess();

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <Input
                type="number"
                name="STT"
                placeholder="STT"
                value={formData.STT}
                onChange={handleChange}
            />

            <Input
                name="MA_NGHE"
                placeholder="Mã nghề"
                value={formData.MA_NGHE}
                onChange={handleChange}
            />

            <Input
                name="TEN_NGHE"
                placeholder="Tên nghề"
                value={formData.TEN_NGHE}
                onChange={handleChange}
            />

            <Button type="submit">
                Add Hinh Thuc Thanh Toan
            </Button>

        </form>
    );
};

export default HinhThucThanhToanForm;