import Table from '../../common/Table/Table';
import formatCurrency from '../../../untils/formatCurrency';
import formatDate from '../../../untils/formatDate';

const TKNhapTable = ({ records }) => {

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
            title: 'Mã NCC',
        },
        {
            key: 'TenDoiTac',
            title: 'Nhà CC',
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
            title: 'Giá trị',
            render: (row) => formatCurrency(row.GiaTri),
        },
        {
            key: 'VeE',
            title: 'Vé ế',
            render: (row) => row.VeE ?? 0,
        },
        {
            key: 'ThucTinh',
            title: 'Thực nhập',
            render: (row) => formatCurrency(row.GiaTri - row.VeE),
        },
        {
            key: 'TyLeThanhToan',
            title: 'Tỷ lệ TT (%)',
            render: (row) => `${row.TyLeThanhToan * 100 ?? 0}`,
        },
        {
            key: 'ThanhTien',
            title: 'TT nhập',
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

export default TKNhapTable;