import { useEffect, useState } from 'react';

import capveService from '../../../services/capve.service';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Select from '../../common/Select/Select';
import Checkbox from '../../common/CheckBox/CheckBox';

const initialState = {
    MaCap: '',
    TenCap: '',
    MaCTXS: '',
    Thu2: false,
    Thu3: false,
    Thu4: false,
    Thu5: false,
    Thu6: false,
    Thu7: false,
    CN: false
};

const CapVeForm = ({
    congTys,
    selectedCapVe,
    onSuccess
}) => {

    const [formData, setFormData] = useState(initialState);

    const [loading, setLoading] = useState(false);

    // EDIT MODE
    useEffect(() => {

        if (selectedCapVe) {

            setFormData({
                ...selectedCapVe,
                Thu2: !!selectedCapVe.Thu2,
                Thu3: !!selectedCapVe.Thu3,
                Thu4: !!selectedCapVe.Thu4,
                Thu5: !!selectedCapVe.Thu5,
                Thu6: !!selectedCapVe.Thu6,
                Thu7: !!selectedCapVe.Thu7,
                CN: !!selectedCapVe.CN
            });

        } else {

            setFormData(initialState);

        }

    }, [selectedCapVe]);

    // INPUT
    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // CHECKBOX
    const handleCheckbox = (event) => {

        const { name, checked } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: checked
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

            if (selectedCapVe) {

                await capveService.update(
                    formData.MaCap,
                    formData
                );

            } else {

                await capveService.create(formData);

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
                type="text"
                name="MaCap"
                placeholder="Mã cặp vé"
                value={formData.MaCap}
                onChange={handleChange}
                disabled={!!selectedCapVe}
            />

            <Input
                type="text"
                name="TenCap"
                placeholder="Tên cặp vé"
                value={formData.TenCap}
                onChange={handleChange}
            />

            <Select
                name="MaCTXS"
                value={formData.MaCTXS}
                onChange={handleChange}
                options={congTys}
                valueField="MaCTXS"
                labelField="TenCTXS"
            />

            <div
                style={{
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap',
                    marginTop: '10px'
                }}
            >

                <Checkbox
                    name="Thu2"
                    label="T2"
                    checked={formData.Thu2}
                    onChange={handleCheckbox}
                />

                <Checkbox
                    name="Thu3"
                    label="T3"
                    checked={formData.Thu3}
                    onChange={handleCheckbox}
                />

                <Checkbox
                    name="Thu4"
                    label="T4"
                    checked={formData.Thu4}
                    onChange={handleCheckbox}
                />

                <Checkbox
                    name="Thu5"
                    label="T5"
                    checked={formData.Thu5}
                    onChange={handleCheckbox}
                />

                <Checkbox
                    name="Thu6"
                    label="T6"
                    checked={formData.Thu6}
                    onChange={handleCheckbox}
                />

                <Checkbox
                    name="Thu7"
                    label="T7"
                    checked={formData.Thu7}
                    onChange={handleCheckbox}
                />

                <Checkbox
                    name="CN"
                    label="CN"
                    checked={formData.CN}
                    onChange={handleCheckbox}
                />

            </div>

            <Button
                type="submit"
                disabled={loading}
            >
                {
                    loading
                        ? 'Saving...'
                        : selectedCapVe
                            ? 'Update'
                            : 'Add'
                }
            </Button>

        </form>
    );
};

export default CapVeForm;