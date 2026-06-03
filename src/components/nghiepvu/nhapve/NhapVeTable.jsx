import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';

const columns = [
    { label: 'Đợt phát hành', field: 'MaDot',    type: 'select' },
    { label: 'Số cặp',        field: 'SoCap' },
    { label: 'Mệnh giá (đ)',  field: 'MenhGia' },
    { label: 'Giá trị',       field: 'GiaTri',   disabled: true },
    { label: 'Vé ế',          field: 'VeE' },
    { label: 'Thực nhận',     field: 'ThucNhan', disabled: true },
    { label: 'Tỷ lệ TT (%)',  field: 'TyLe' },
    { label: 'TT nhập',       field: 'TTNhap',   disabled: true },
    { label: 'Ghi chú',       field: 'GhiChu' },
];

const calcRow = (row) => {

    const soCap   = parseInt(row.SoCap)   || 0;
    const menhGia = parseInt(row.MenhGia) || 0;
    const veE     = parseInt(row.VeE)     || 0;
    const tyLe    = parseFloat(row.TyLe)  || 0;

    // Giá trị = tổng toàn bộ vé nhận (kể cả vé ế)
    const giaTri = soCap * menhGia;

    // Thực nhận = (số cặp - vé ế) * mệnh giá
    const thucNhan = giaTri - veE;

    // TT nhập = thực nhận * tỷ lệ %
    const ttNhap = Math.round(thucNhan * tyLe / 100);

    return {
        ...row,
        GiaTri:   giaTri   >= 0 ? giaTri   : 0,
        ThucNhan: thucNhan >= 0 ? thucNhan : 0,
        TTNhap:   ttNhap   >= 0 ? ttNhap   : 0,
    };
};

const NhapVeTable = ({
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