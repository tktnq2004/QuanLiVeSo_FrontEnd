import formatCurrency from '../../../untils/formatCurrency';
import formatDate from '../../../untils/formatDate';

const TKLoiNhuanTable = ({ records }) => {

    const total = records.reduce((acc, row) => ({
        ThanhTienBan: acc.ThanhTienBan + (row.ThanhTienBan || 0),
        ThanhTienVon: acc.ThanhTienVon + (row.ThanhTienVon || 0),
        LoiNhuan: acc.LoiNhuan + (row.LoiNhuan || 0),
    }), { ThanhTienBan: 0, ThanhTienVon: 0, LoiNhuan: 0 });

    const pctTotal = total.ThanhTienBan
        ? (total.LoiNhuan / total.ThanhTienBan * 100).toFixed(1)
        : 0;

    return (
        <table className="custom-table">

            <thead>
                {/* ── Row tổng ── */}
                {records.length > 0 && (
                    <tr style={{ background: '#e3f2fd' }}>
                        <th style={{ color: '#1976d2' }}>Tổng</th>
                        <th></th>
                        <th style={{ color: '#1976d2' }}>{formatCurrency(total.ThanhTienBan)}</th>
                        <th style={{ color: '#1976d2' }}>{formatCurrency(total.ThanhTienVon)}</th>
                        <th style={{ color: '#1976d2' }}>{formatCurrency(total.LoiNhuan)}</th>
                        <th style={{ color: '#1976d2' }}>{pctTotal}%</th>
                    </tr>
                )}

                {/* ── Header ── */}
                <tr>
                    <th>Mã kỳ xổ</th>
                    <th>Ngày xổ</th>
                    <th>TT Bán</th>
                    <th>TT Vốn</th>
                    <th>Lợi nhuận</th>
                    <th>%LN/Bán</th>
                </tr>
            </thead>

            <tbody>
                {records.map((row) => (
                    <tr key={row.MaKyXo}>
                        <td>{row.MaKyXo}</td>
                        <td>{formatDate(row.NgayXo)}</td>
                        <td>{formatCurrency(row.ThanhTienBan)}</td>
                        <td>{formatCurrency(row.ThanhTienVon)}</td>
                        <td>{formatCurrency(row.LoiNhuan)}</td>
                        <td>
                            {row.ThanhTienBan
                                ? `${(row.LoiNhuan / row.ThanhTienBan * 100).toFixed(1)}%`
                                : '0%'
                            }
                        </td>
                    </tr>
                ))}
            </tbody>

        </table>
    );
};

export default TKLoiNhuanTable;