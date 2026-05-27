import Table from '../../common/Table/Table';
import Button from '../../common/Button/Button';

const DotPhatHanhTable = ({ dotphathanhs, onEdit, onDelete }) => {

    const columns = [
        {
            key: 'MaDot',
            title: 'Mã đợt'
        },
        {
            key: 'TenCap',
            title: 'Cặp vé'
        },
        {
            key: 'NgayXo',
            title: 'Ngày xổ',
            render: (item) => item.NgayXo  // fix: format date
                ? new Date(item.NgayXo).toLocaleDateString('vi-VN')
                : ''
        },
        {
            key: 'MaKyXo',
            title: 'Mã kỳ xổ'
        },
        {
            key: 'DienGiai',
            title: 'Diễn giải'
        },
        {
            key: 'NgayGioTao',
            title: 'Ngày giờ tạo',
            render: (item) => item.NgayGioTao
                ? new Date(item.NgayGioTao).toLocaleString('vi-VN')
                : ''
        }

    ];

    return (
        <Table
            columns={columns}
            data={dotphathanhs}
            renderActions={(item) => (
                <div style={{ display: 'flex', gap: '8px' }}> {/* fix: thêm gap */}
                    <Button onClick={() => onEdit(item)}>
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => onDelete(item.MaDot)}
                    >
                        Delete
                    </Button>
                </div>
            )}
        />
    );
};

export default DotPhatHanhTable;