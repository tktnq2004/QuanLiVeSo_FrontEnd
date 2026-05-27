import Search from '../../common/SearchBar/Search';

const NhomSearch = ({ filters, onFilterChange }) => {

    const columns = [
        {
            key: 'MA_NHOM',
            title: 'Mã nhóm',
            searchable: true
        },
        {
            key: 'TEN_NHOM',
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