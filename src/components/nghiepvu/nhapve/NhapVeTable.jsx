// NhapVeTable.jsx
import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';

const columns = [
    { label: 'Mã kỳ sổ',  field: 'MaKySo',   type: 'select' },
    { label: 'Số cặp',     field: 'SoCap' },
    { label: 'Mệnh giá',   field: 'MenhGia' },
    { label: 'Giá trị',    field: 'GiaTri',   disabled: true },  // auto
    { label: 'Vé ế',       field: 'VeE' },
    { label: 'Thực nhận',  field: 'ThucNhan', disabled: true },  // auto
    { label: 'Đơn giá',    field: 'DonGia' },
    { label: 'TT nhập',    field: 'TTNhap',   disabled: true },  // auto
    { label: 'Ghi chú',    field: 'GhiChu' }
];

// tính toán các field tự động
const calcRow = (row) => {

    const soCap   = parseFloat(row.SoCap)   || 0;
    const menhGia = parseFloat(row.MenhGia) || 0;
    const veE     = parseFloat(row.VeE)     || 0;
    const donGia  = parseFloat(row.DonGia)  || 0;

    const giaTri   = soCap * menhGia;
    const thucNhan = giaTri - veE;
    const ttNhap   = soCap * donGia * 1000;

    return {
        ...row,
        GiaTri:   giaTri   || '',
        ThucNhan: thucNhan || '',
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
                ? calcRow({ ...row, [field]: value })  // tính lại sau mỗi thay đổi
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