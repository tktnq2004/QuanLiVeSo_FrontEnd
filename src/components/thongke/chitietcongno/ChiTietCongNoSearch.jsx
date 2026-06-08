import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';

const ChiTietCongNoSearch = ({ filters, onFilterChange, doiTacs }) => {

    const doiTacOptions = [
        { MaDoiTac: 'tatCa', TenDoiTac: 'Tất cả' },
        ...doiTacs,
    ];

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
                label="Đối tác"
                name="maDoiTac"
                value={filters.maDoiTac}
                onChange={onFilterChange}
                options={doiTacOptions}
                valueField="MaDoiTac"
                labelField="TenDoiTac"
            />

        </div>
    );
};

export default ChiTietCongNoSearch;