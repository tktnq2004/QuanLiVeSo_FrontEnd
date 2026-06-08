import Input from '../../common/Input/Input';

const TKLoiNhuanSearch = ({ filters, onFilterChange }) => {

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

        </div>
    );
};

export default TKLoiNhuanSearch;