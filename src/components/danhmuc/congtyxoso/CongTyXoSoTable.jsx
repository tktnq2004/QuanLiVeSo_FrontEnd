import Button from '../../common/Button/Button';
import Table from '../../common/Table/Table';

const CongTyXoSoTable = ({
    congtyxosos,
    onEdit,
    onDelete
}) => {

    const columns = [
        {
            key: 'MaCTXS',
            title: 'Mã CTXS'
        },
        {
            key: 'TenCTXS',
            title: 'Tên công ty'
        },
        {
            key: 'Dung',
            title: 'Ngưng SD',
            render: (item) => (
                item.Dung
                    ? 'Có'
                    : 'Không'
            )
        }
    ];

    return (
        <Table
            columns={columns}
            data={congtyxosos}
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
                        onClick={() => onDelete(item.MaCTXS)}
                    >
                        Delete
                    </Button>

                </div>
            )}
        />
    );
};

export default CongTyXoSoTable;