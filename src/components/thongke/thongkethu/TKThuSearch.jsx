import Input  from '../../common/Input/Input';
import Select from '../../common/Select/Select';

const TKThuTienSearch = ({ filters, onFilterChange, doiTacs, httts }) => {

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
                label="Khách hàng"
                name="MaDoiTac"
                value={filters.MaDoiTac}
                onChange={onFilterChange}
                options={doiTacs}
                valueField="MaDoiTac"
                labelField="TenDoiTac"
            />

            <Select
                label="Hình thức TT"
                name="MaHT"
                value={filters.MaHT}
                onChange={onFilterChange}
                options={httts}
                valueField="MaHT"
                labelField="TenHT"
            />

        </div>
    );
};

export default TKThuTienSearch;