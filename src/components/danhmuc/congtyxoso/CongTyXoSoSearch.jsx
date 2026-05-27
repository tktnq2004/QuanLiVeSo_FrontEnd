import Search from '../../common/SearchBar/Search';

const CongTyXoSoSearch = ({ filters, onFilterChange }) => {

    const columns = [
        {
            key: 'MaCTXS',
            title: 'Mã CTXS',
            searchable: true
        },
        {
            key: 'TenCTXS',
            title: 'Tên công ty',
            searchable: true
        }
    ];

    return (
        <Search
            columns={columns}
            filters={filters}
            onChange={onFilterChange}
        />
    );
};

export default CongTyXoSoSearch;