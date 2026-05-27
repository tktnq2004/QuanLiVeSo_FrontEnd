import Search from '../../common/SearchBar/Search';

const CapVeSearch = ({
    filters,
    onFilterChange
}) => {
    const columns = [
        {
            key: 'MaCap',
            title: 'Mã cặp',
            searchable: true
        },
        {
            key: 'TenCap',
            title: 'Tên cặp',
            searchable: true
        },
        {
            key: 'MaCTXS',
            title: 'Mã CTXS',
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

export default CapVeSearch;