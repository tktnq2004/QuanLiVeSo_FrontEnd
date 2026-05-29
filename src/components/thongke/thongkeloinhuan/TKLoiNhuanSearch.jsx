import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';

const TKLoiNhuanSearch = ({ filters, onFilterChange, doiTacs, kyXos }) => {

    return (
        <div className="tkloinhuan-search">

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