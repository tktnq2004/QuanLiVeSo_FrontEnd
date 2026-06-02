import Search from '../../common/SearchBar/Search';

const NhomSearch = ({ filters, onFilterChange }) => {

    const columns = [
        {
            key: 'MaNhom',
            title: 'Mã nhóm',
            searchable: true
        },
        {
            key: 'TenNhom',
            title: 'Tên nhóm',
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

export default NhomSearch;