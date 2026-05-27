import Search from '../../common/SearchBar/Search';

const DotPhatHanhSearch = ({ filters, onFilterChange }) => {

    const columns = [
        {
            key: 'MaDot',
            title: 'Mã đợt',
            searchable: true
        },
        {
            key: 'TenCap',
            title: 'Cặp vé',
            searchable: true
        },
        {
            key: 'MaKyXo',
            title: 'Mã kỳ xổ',
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

export default DotPhatHanhSearch;