import Input  from '../../common/Input/Input';
import Select from '../../common/Select/Select';

const columns = [
    { label: 'Đợt phát hành', field: 'MaDot',   type: 'select' },
    { label: 'Vé thu về',     field: 'VeE' },
    { label: 'Tỷ lệ TT (%)',  field: 'TyLe' },
    { label: 'TT thu',        field: 'TTThu',   disabled: true },
    { label: 'Ghi chú',       field: 'GhiChu' },
];

const calcRow = (row) => {

    const veE     = parseInt(row.VeE)     || 0;
    const tyLe    = parseFloat(row.TyLe)  || 0;

    const ttThu = Math.round(veE * tyLe / 100);

    return {
        ...row,
        TTThu:  ttThu  >= 0 ? ttThu  : 0,
    };
};

const ThuVeTable = ({
    dotPhatHanh = [],
    rows,
    selectedRowId,
    onRowsChange,
    onSelectRow,
    emptyRow,
}) => {

    const handleChange = (rowId, field, value) => {

        const updated = rows.map(row =>
            row.id === rowId
                ? calcRow({ ...row, [field]: value })
                : row
        );

        if (field === 'MaDot' && value) {
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
                    options={dotPhatHanh}
                    valueField="MaDot"
                    labelField="DienGiai"
                />
            );
        }

        return (
            <Input
                value={row[col.field] ?? ''}
                disabled={col.disabled}
                onChange={(e) =>
                    handleChange(row.id, col.field, e.target.value)
                }
            />
        );
    };

    return (
        <div className="thuve-table-wrapper">
            <table className="thuve-table">
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
                            className={`thuve-table__row ${selectedRowId === row.id ? 'thuve-table__row--selected' : ''}`}
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
        </div>
    );
};

export default ThuVeTable;