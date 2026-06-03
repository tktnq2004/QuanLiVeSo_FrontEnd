import Table  from '../../common/Table/Table';
import Button from '../../common/Button/Button';

import formatDate     from '../../../untils/formatDate';
import formatCurrency from '../../../untils/formatCurrency';

const ChiTienTable = ({ chiTiens, onEdit, onDelete }) => {

    const columns = [
        {
            key:   'SoCT',
            title: 'Số CT',
        },
        {
            key:    'NgayGiao',
            title:  'Ngày',
            render: (item) => formatDate(item.NgayGiao),
        },
        {
            key:    'MaDoiTac',
            title:  'Đối tác',
            render: (item) => item.TenDoiTac || item.MaDoiTac || '',
        },
        {
            key:    'ThanhTien',
            title:  'Số tiền',
            render: (item) => formatCurrency(item.ThanhTien),
        },
        {
            key:    'MaHT',
            title:  'Hình thức TT',
            render: (item) => item.TenHT || item.MaHT || '',
        },
        {
            key:   'GhiChu',
            title: 'Ghi chú',
        },
    ];

    return (
        <Table
            columns={columns}
            data={chiTiens}
            renderActions={(item) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button onClick={() => onEdit(item)}>
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => onDelete(item.IDPhieu)}
                    >
                        Delete
                    </Button>
                </div>
            )}
        />
    );
};

export default ChiTienTable;