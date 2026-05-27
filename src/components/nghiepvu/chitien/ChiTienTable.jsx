
import Table from "../../common/Table/Table";
import Button from "../../common/Button/Button";

const ChiTienTable = ({
    chiTiens,
    onEdit,
    onDelete
}) => {



    const columns = [
        {
            key: 'SoCT',
            title: 'Số CT'
        },
        {
            key: 'NgayTao',
            title: 'Ngày'
        },
        {
            key: 'KhachHang',
            title: 'Khách hàng',
        },
        {
            key: 'SoTien',
            title: 'Số tiền',
            render: (item) => item.SoTien?.toLocaleString('vi-VN') || ''
        },
        {
            key: 'HTTT',
            title: 'Hình thức thanh toán',
            render: (item) => item.HTTT || ''
        },
        {
            key: 'GhiChu',
            title: 'Về Khoản',
            render: (item) => item.GhiChu || ''
        }
    ];

    return (
        <Table
            columns={columns}
            data={chiTiens}
            renderActions={(item) => (
                <div
                    style={{
                        display: 'flex',
                        gap: '8px'
                    }}
                >

                    <Button
                        onClick={() => onEdit(item)}
                    >
                        Edit
                    </Button>

                    <Button
                        variant="danger"
                        onClick={() => onDelete(item.MaChiTien)}
                    >
                        Delete
                    </Button>

                </div>
            )}
        />
    );
};

export default ChiTienTable;

