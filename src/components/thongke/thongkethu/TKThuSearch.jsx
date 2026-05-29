import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';

const TKThuSearch = ({ filters, onFilterChange, doiTacs, kyXos }) => {

    return (
        <div className="tknhap-search">

            <Input
                type="date"
                label="Từ ngày"
                name="TuNgay"
                value={filters.TuNgay}
                onChange={onFilterChange}
            />

            <Input
                type="date"
                label="Đến ngày"
                name="DenNgay"
                value={filters.DenNgay}
                onChange={onFilterChange}
            />

            <Select
                label="Khách Hàng"
                name="MaDoiTac"
                value={filters.MaDoiTac}
                onChange={onFilterChange}
                options={doiTacs}
                valueField="MaDoiTac"
                labelField="TenDoiTac"
            />

            

        </div>
    );
};

export default TKThuSearch;