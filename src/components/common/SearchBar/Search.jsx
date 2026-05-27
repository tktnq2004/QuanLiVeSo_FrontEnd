import Input from '../Input/Input';
import './Search.scss';

const SearchBar = ({
    columns,
    filters,
    onChange
}) => {

    const searchableColumns =
        columns.filter(
            (column) => column.searchable
        );

    return (

        <div
            style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                marginBottom: '20px'
            }}
        >

            {
                searchableColumns.map((column) => (

                    <Input
                        key={column.key}
                        name={column.key}
                        placeholder={`Search ${column.title}`}
                        value={filters[column.key] || ''}
                        onChange={onChange}
                    />

                ))
            }

        </div>
    );
};

export default SearchBar;