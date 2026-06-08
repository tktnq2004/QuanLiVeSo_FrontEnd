import Input  from '../../common/Input/Input';
import Select from '../../common/Select/Select';

const PHAN_LOAI_OPTIONS = [
    { value: 'tatCa',        label: 'Tất cả' },
    { value: 'Nhà Cung Cấp', label: 'Nhà cung cấp' },
    { value: 'Đại Lý',       label: 'Khách hàng' },
];

const TINH_THEO_OPTIONS = [
    { value: 'ngayGiao', label: 'Ngày giao vé' },
    { value: 'ngayXo',   label: 'Ngày xổ' },
];

const CongNoSearch = ({ filters, onFilterChange }) => {

    return (
        <div className="tknhap-search">

            <Input
                type="date"
                label="Từ ngày"
                name="tuNgay"
                value={filters.tuNgay}
                onChange={onFilterChange}
            />

            <Input
                type="date"
                label="Đến ngày"
                name="denNgay"
                value={filters.denNgay}
                onChange={onFilterChange}
            />

            <Select
                label="Đối tượng"
                name="phanLoai"
                value={filters.phanLoai}
                onChange={onFilterChange}
                options={PHAN_LOAI_OPTIONS}
                valueField="value"
                labelField="label"
            />

            <Select
                label="Tính theo"
                name="tinhTheo"
                value={filters.tinhTheo}
                onChange={onFilterChange}
                options={TINH_THEO_OPTIONS}
                valueField="value"
                labelField="label"
            />

        </div>
    );
};

export default CongNoSearch;