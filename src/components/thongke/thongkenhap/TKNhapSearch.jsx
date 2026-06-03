import Input  from '../../common/Input/Input';
import Select from '../../common/Select/Select';

const TKNhapSearch = ({
    filters,
    onFilterChange,
    doiTacs,
    kyXos,
}) => {

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
                label="Nhà cung cấp"
                name="MaDoiTac"
                value={filters.MaDoiTac}
                onChange={onFilterChange}
                options={doiTacs}
                valueField="MaDoiTac"
                labelField="TenDoiTac"
            />

            <Select
                label="Kỳ xổ"
                name="MaKyXo"
                value={filters.MaKyXo}
                onChange={onFilterChange}
                options={kyXos}
                valueField="MaKyXo"     // DotPhatHanh.MaKyXo
                labelField="MaKyXo"
            />

        </div>
    );
};

export default TKNhapSearch;