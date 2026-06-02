import Table  from '../../common/Table/Table';
import Button from '../../common/Button/Button';

const ThuTienTable = ({ thuTiens, onEdit, onDelete }) => {

    const columns = [
        {
            key: 'SoCT',
            title: 'Số CT',
        },
        {
            key: 'NgayGiao',
            title: 'Ngày',
            render: (item) => item.NgayGiao
                ? new Date(item.NgayGiao).toLocaleDateString('vi-VN')
                : '',
        },
        {
            key: 'MaDoiTac',
            title: 'Khách hàng',
            render: (item) => item.TenDoiTac || item.MaDoiTac || '',
        },
        {
            key: 'TienTra',
            title: 'Số tiền',
            render: (item) => item.TienTra
                ? Number(item.TienTra).toLocaleString('vi-VN') + ' ₫'
                : '',
        },
        {
            key: 'MaHT',
            title: 'Hình thức TT',
            render: (item) => item.TenHT || item.MaHT || '',
        },
        {
            key: 'GhiChu',
            title: 'Ghi chú',
        },
    ];

    return (
        <Table
            columns={columns}
            data={thuTiens}
            renderActions={(item) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button onClick={() => onEdit(item)}>
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => onDelete(item.ID)}  // ✅ dùng ID, không phải MaCap
                    >
                        Delete
                    </Button>
                </div>
            )}
        />
    );
};

export default ThuTienTable;