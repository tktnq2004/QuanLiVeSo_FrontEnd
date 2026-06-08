import formatCurrency from '../../../utils/formatCurrency';

const CongNoTable = ({ records }) => {

    const total = records.reduce((acc, row) => ({
        DauKy: acc.DauKy + (row.DauKy || 0),
        PsNo: acc.PsNo + (row.PsNo || 0),
        PsCo: acc.PsCo + (row.PsCo || 0),
        CuoiKy: acc.CuoiKy + (row.CuoiKy || 0),
    }), { DauKy: 0, PsNo: 0, PsCo: 0, CuoiKy: 0 });

    return (
        <table className="custom-table">

            <thead>
                {/* ── Row tổng ── */}
                {records.length > 0 && (
                    <tr style={{ background: '#e3f2fd' }}>
                        <th style={{ color: '#1976d2' }}>Tổng</th>
                        <th></th>
                        <th></th>
                        <th style={{ color: '#1976d2' }}>{formatCurrency(total.DauKy)}</th>
                        <th style={{ color: '#1976d2' }}>{formatCurrency(total.PsNo)}</th>
                        <th style={{ color: '#1976d2' }}>{formatCurrency(total.PsCo)}</th>
                        <th style={{ color: total.CuoiKy < 0 ? '#d32f2f' : '#388e3c', fontWeight: 'bold' }}>
                            {formatCurrency(total.CuoiKy)}
                        </th>
                    </tr>
                )}

                {/* ── Header ── */}
                <tr>
                    <th>Mã đối tác</th>
                    <th>Tên đối tác</th>
                    <th>Phân loại</th>
                    <th>Đầu kỳ</th>
                    <th>PS Nợ</th>
                    <th>PS Có</th>
                    <th>Cuối kỳ</th>
                </tr>
            </thead>

            <tbody>
                {records.map((row) => (
                    <tr key={row.MaDoiTac}>
                        <td>{row.MaDoiTac}</td>
                        <td>{row.TenDoiTac}</td>
                        <td>{row.PhanLoai}</td>
                        <td>{formatCurrency(row.DauKy)}</td>
                        <td>{formatCurrency(row.PsNo)}</td>
                        <td>{formatCurrency(row.PsCo)}</td>
                        <td>
                            <span style={{
                                color: row.CuoiKy < 0 ? '#d32f2f' : '#388e3c',
                                fontWeight: 'bold',
                            }}>
                                {formatCurrency(row.CuoiKy)}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>

        </table>
    );
};

export default CongNoTable;