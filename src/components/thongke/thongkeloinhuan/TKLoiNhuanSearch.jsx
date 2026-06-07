import Input from '../../common/Input/Input';

const TKLoiNhuanSearch = ({ filters, onFilterChange }) => {

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

        </div>
    );
};

export default TKLoiNhuanSearch;