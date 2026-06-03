import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';

const columns = [
    { label: 'Đợt phát hành', field: 'MaDot',    type: 'select' },
    { label: 'Số cặp',        field: 'SoCap' },
    { label: 'Mệnh giá (đ)',  field: 'MenhGia' },
    { label: 'Giá trị',       field: 'GiaTri',   disabled: true },
    { label: 'Vé ế',          field: 'VeE' },
    { label: 'Thực bán',      field: 'ThucBan',  disabled: true },
    { label: 'Tỷ lệ TT (%)',  field: 'TyLe' },
    { label: 'TT bán',        field: 'TTBan',    disabled: true },
    { label: 'Ghi chú',       field: 'GhiChu' },
];

const calcRow = (row) => {

    const soCap   = parseInt(row.SoCap)   || 0;
    const menhGia = parseInt(row.MenhGia) || 0;
    const veE     = parseInt(row.VeE)     || 0;
    const tyLe    = parseFloat(row.TyLe)  || 0;

    // Giá trị = toàn bộ vé (kể cả vé ế)
    const giaTri = soCap * menhGia;

    // Thực bán = (số cặp - vé ế) * mệnh giá
    const thucBan = (soCap - veE) * menhGia;

    // TT bán = thực bán * tỷ lệ %
    const ttBan = Math.round(thucBan * tyLe / 100);

    return {
        ...row,
        GiaTri:  giaTri  >= 0 ? giaTri  : 0,
        ThucBan: thucBan >= 0 ? thucBan : 0,
        TTBan:   ttBan   >= 0 ? ttBan   : 0,
    };
};

const BanVeTable = ({
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
        <table className="banve-table">
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
                        className={`banve-table__row ${selectedRowId === row.id ? 'banve-table__row--selected' : ''}`}
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

export default BanVeTable;