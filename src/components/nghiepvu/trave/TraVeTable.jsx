// NhapVeTable.jsx
import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';

const columns = [
    { label: 'Mã kỳ sổ',  field: 'MaKySo',   type: 'select' },
    { label: 'Vé ế',       field: 'VeE' },
    { label: 'Đơn giá',    field: 'DonGia' },
    { label: 'TT nhập',    field: 'TTNhap',   disabled: true },  // auto
    { label: 'Ghi chú',    field: 'GhiChu' }
];

const calcRow = (row) => {

    const veE     = parseFloat(row.VeE)     || 0;
    const donGia  = parseFloat(row.DonGia)  || 0;

    const ttNhap   = veE * donGia / 100;

    return {
        ...row,
        TTNhap:   ttNhap   || ''
    };
};

const NhapVeTable = ({
    kyXoOptions = [],
    rows,
    selectedRowId,
    onRowsChange,
    onSelectRow,
    emptyRow
}) => {

    const handleChange = (rowId, field, value) => {

        const updated = rows.map(row =>
            row.id === rowId
                ? calcRow({ ...row, [field]: value }) 
                : row
        );

        if (field === 'MaKySo' && value) {
            const isLastRow = rows[rows.length - 1].id === rowId;
            if (isLastRow) {
                onRowsChange([...updated, emptyRow()]);
                return;
            }
        }

        onRowsChange(updated);
    };

    const renderCell = (col, row) => {

        if (col.type === 'select') {
            return (
                <Select
                    value={row[col.field]}
                    onChange={(e) =>
                        handleChange(row.id, col.field, e.target.value)
                    }
                    options={kyXoOptions}
                    valueField="MaKyXo"
                    labelField="MaKyXo"
                />
            );
        }

        return (
            <Input
                value={row[col.field]}
                disabled={col.disabled}
                onChange={(e) =>
                    handleChange(row.id, col.field, e.target.value)
                }
            />
        );
    };

    return (
        <table className="nhapve-table">
            <thead>
                <tr>
                    {columns.map(col => (
                        <th key={col.field}>{col.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map(row => (
                    <tr
                        key={row.id}
                        className={`nhapve-table__row ${selectedRowId === row.id ? 'nhapve-table__row--selected' : ''}`}
                        onClick={() => onSelectRow(row.id)}
                    >
                        {columns.map(col => (
                            <td
                                key={col.field}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {renderCell(col, row)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default NhapVeTable;