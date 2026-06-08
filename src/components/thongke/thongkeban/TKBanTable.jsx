import Table from '../../common/Table/Table';
import formatCurrency from '../../../utils/formatCurrency';
import formatDate from '../../../utils/formatDate';

const TKBanTable = ({ records }) => {

    const columns = [
        {
            key: 'MaKyXo',
            title: 'Mã kỳ xổ',
        },
        {
            key: 'SoCT',
            title: 'Số CT',
        },
        {
            key: 'NgayGiao',
            title: 'Ngày giao',
            render: (row) => formatDate(row.NgayGiao),
        },
        {
            key: 'DienGiai',
            title: 'Diễn giải',
        },
        {
            key: 'MaDoiTac',
            title: 'Mã KH',
        },
        {
            key: 'TenDoiTac',
            title: 'Khách hàng',
        },
        {
            key: 'SoCap',
            title: 'Số cặp',
        },
        {
            key: 'DonGia',
            title: 'Mệnh giá',
            render: (row) => formatCurrency(row.DonGia),
        },
        {
            key: 'GiaTri',
            title: 'Giá trị',          // SoCap * DonGia
            render: (row) => formatCurrency(row.GiaTri),
        },
        {
            key: 'VeE',
            title: 'Vé ế',
            render: (row) => row.VeE ?? 0,
        },
        {
            key: 'ThucTinh',
            title: 'Thực bán',
            render: (row) => formatCurrency(row.GiaTri - row.VeE),
        },
        {
            key: 'TyLeThanhToan',
            title: 'Tỷ lệ TT (%)',
            render: (row) => `${(row.TyLeThanhToan * 100) ?? 0}`,
        },
        {
            key: 'ThanhTien',
            title: 'TT bán',
            render: (row) => formatCurrency(row.ThanhTien),
        },
        {
            key: 'GhiChu',
            title: 'Ghi chú',
            render: (row) => row.GhiChu || '',
        },
    ];

    return (
        <Table
            columns={columns}
            data={records}
        />
    );
};

export default TKBanTable;