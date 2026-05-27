import Table from '../../common/Table/Table';
import Button from '../../common/Button/Button';

const DoiTacTable = ({
    doiTacs,
    onEdit,
    onDelete
}) => {

    const columns = [
        {
            key: 'MaDoiTac',
            title: 'Mã'
        },
        {
            key: 'TenDoiTac',
            title: 'Tên đối tác'
        },
        {
            key: 'TenNhom',
            title: 'Nhóm'
        },
        {
            key: 'PhanLoai',
            title: 'Phân loại'
        },
        {
            key: 'DienThoai',
            title: 'Điện thoại'
        },
        {
            key: 'SoTaiKhoan',
            title: 'Số TK'
        },
        {
            key: 'TenChuSoHuu',
            title: 'Tên chủ sở hữu'
        },
        {
            key: 'TenNganHang',
            title: 'Tên ngân hàng'
        },
        {
            key: 'NoDauKy',
            title: 'Nợ đầu kỳ'
        }
    ];

    return (
        <Table
            columns={columns}
            data={doiTacs}
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
                        onClick={() => onDelete(item.MaDoiTac)}
                    >
                        Delete
                    </Button>
                </div>
            )}
        />
    );
};

export default DoiTacTable;