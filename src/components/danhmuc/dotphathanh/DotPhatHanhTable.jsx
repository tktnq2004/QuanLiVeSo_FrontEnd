import Table from '../../common/Table/Table';
import Button from '../../common/Button/Button';
import formatDate from '../../../utils/formatDate';

const DotPhatHanhTable = ({ dotphathanhs, onEdit, onDelete }) => {

    const columns = [
        {
            key: 'TenCap',
            title: 'Cặp vé'
        },
        {
            key: 'NgayXo',
            title: 'Ngày xổ',
            render: (item) => formatDate(item.NgayXo)
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
            render: (item) => formatDate(item.NgayGioTao)
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