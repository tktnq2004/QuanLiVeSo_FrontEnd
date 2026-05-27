import Search from '../../common/SearchBar/Search';

const DoiTacSearch = ({ filters, onFilterChange }) => {

    const columns = [
        {
            key: 'MaDoiTac',
            title: 'Mã đối tác',
            searchable: true
        },
        {
            key: 'TenDoiTac',
            title: 'Tên đối tác',
            searchable: true
        },
        {
            key: 'TenNhom',
            title: 'Nhóm',
            searchable: true
        },
        {
            key: 'PhanLoai',
            title: 'Phân loại',
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

export default DoiTacSearch;