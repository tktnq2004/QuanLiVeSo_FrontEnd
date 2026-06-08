import Table from '../../common/Table/Table';
import formatCurrency from '../../../untils/formatCurrency';
import formatDate from '../../../untils/formatDate';

const LOAI_CONFIG = {
    1: { label: 'Nhập', },
    2: { label: 'Xuất', },
    5: { label: 'Thu tiền' },
    6: { label: 'Chi tiền' },
};

const ChiTietCongNoTable = ({ records }) => {

    const columns = [
        { key: 'SoCT', title: 'Số CT', render: (row) => row.SoCT || '' },
        { key: 'NgayGiao', title: 'Ngày giao', render: (row) => formatDate(row.NgayGiao) },
        { key: 'NgayXo', title: 'Ngày xổ', render: (row) => row.NgayXo ? formatDate(row.NgayXo) : '' },
        { key: 'MaDot', title: 'Mã vé', render: (row) => row.MaDot || '' },
        { key: 'DienGiai', title: 'Diễn giải', render: (row) => row.DienGiai || '' },
        { key: 'SoCap', title: 'Số cặp', render: (row) => row.SoCap ?? '' },
        { key: 'MenhGia', title: 'Mệnh giá', render: (row) => row.MenhGia ? formatCurrency(row.MenhGia) : '' },
        { key: 'GiaTri', title: 'Giá trị', render: (row) => row.GiaTri ? formatCurrency(row.GiaTri) : '' },
        { key: 'VeE', title: 'Vé ế', render: (row) => row.VeE ?? '' },
        { key: 'ThucTinh', title: 'Thực bán', render: (row) => (row.GiaTri) - (row.VeE ?? 0) ? formatCurrency(row.GiaTri - (row.VeE ?? 0)) : '' },
        { key: 'DonGia', title: 'ĐG', render: (row) => row.DonGia ?? '' },
        {
            key: 'ThanhTien',
            title: 'Thành tiền',
            render: (row) => (
                <span style={{
                    color: row.ThanhTien < 0 ? '#d32f2f' : '#388e3c',
                    fontWeight: 'bold',
                }}>
                    {formatCurrency(row.ThanhTien)}
                </span>
            ),
        },
        {
            key: 'Loai',
            title: 'Loại CT',
            render: (row) => {
                const cfg = LOAI_CONFIG[row.Loai] || {};
                return (
                    <span style={{
                        color: '#0a0a0a',
                        padding: '2px 10px',
                        borderRadius: '4px',
                        fontSize: '12px',
                    }}>
                        {cfg.label}
                    </span>
                );
            },
        },
    ];

    const total = records.reduce((acc, row) => ({
        psTang: acc.psTang + (row.ThanhTien < 0 ? Math.abs(row.ThanhTien) : 0),
        psGiam: acc.psGiam + (row.ThanhTien > 0 ? row.ThanhTien : 0),
    }), { psTang: 0, psGiam: 0 });

    const noCu = records[0]?.NoCu || 0;
    const tongNet = total.psTang - total.psGiam;
    const conNo = noCu + tongNet;

    const summaryMap = {
        SoCT: 'Tổng',
        GiaTri: 'PS tăng: ' + formatCurrency(total.psTang),
        ThanhTien: (
            <span style={{
                color: tongNet > 0 ? '#d32f2f' : '#388e3c',
                fontWeight: 'bold',
            }}>
                PS giảm: {formatCurrency(tongNet)}
            </span>
        ),
        Loai: (
            <span style={{ fontSize: '11px' }}>
                Nợ cũ: <b>{formatCurrency(noCu)}</b>
                {' | '}
                Còn nợ: <b style={{ color: conNo > 0 ? '#d32f2f' : '#388e3c' }}>
                    {formatCurrency(conNo)}
                </b>
            </span>
        ),
    };

    return (
        <div>
            {records.length > 0 && (
                <table className="custom-table" style={{ marginBottom: 0, borderBottom: 'none' }}>
                    <thead>
                        <tr style={{ background: '#e3f2fd' }}>
                            {columns.map((col) => (
                                <th key={col.key} style={{ color: '#1976d2' }}>
                                    {summaryMap[col.key] !== undefined
                                        ? summaryMap[col.key]
                                        : ''
                                    }
                                </th>
                            ))}
                        </tr>
                    </thead>
                </table>
            )}

            {/* ── Bảng dữ liệu ── */}
            <Table
                columns={columns}
                data={records}
            />
        </div>
    );
};

export default ChiTietCongNoTable;