import Table from '../../common/Table/Table';
import formatCurrency from '../../../untils/formatCurrency';
import formatDate     from '../../../untils/formatDate';

const TKThuTienTable = ({ records }) => {

    const columns = [
        {
            key:   'SoCT',
            title: 'Số CT',
        },
        {
            key:    'NgayGiao',
            title:  'Ngày',
            render: (row) => formatDate(row.NgayGiao),
        },
        {
            key:    'MaDoiTac',
            title:  'Mã KH',
        },
        {
            key:    'TenDoiTac',
            title:  'Khách hàng',
        },
        {
            key:    'ThanhTien',
            title:  'Số tiền',
            render: (row) => formatCurrency(row.ThanhTien),
        },
        {
            key:    'MaHT',
            title:  'Hình thức TT',
            render: (row) => row.TenHT || row.MaHT || '',
        },
        {
            key:    'GhiChu',
            title:  'Ghi chú',
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

export default TKThuTienTable;