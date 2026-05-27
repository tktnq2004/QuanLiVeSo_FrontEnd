
import Table from "../../common/Table/Table";
import Button from "../../common/Button/Button";

const CapVeTable = ({
    capVes,
    onEdit,
    onDelete
}) => {

    const renderDay = (value) => (
        value ? '✓' : ''
    );

    const columns = [
        {
            key: 'MaCap',
            title: 'Mã cặp'
        },
        {
            key: 'TenCap',
            title: 'Tên cặp'
        },
        {
            key: 'MaCTXS',
            title: 'Mã CTXS'
        },
        {
            key: 'Thu2',
            title: 'T2',
            render: (item) => renderDay(item.Thu2)
        },
        {
            key: 'Thu3',
            title: 'T3',
            render: (item) => renderDay(item.Thu3)
        },
        {
            key: 'Thu4',
            title: 'T4',
            render: (item) => renderDay(item.Thu4)
        },
        {
            key: 'Thu5',
            title: 'T5',
            render: (item) => renderDay(item.Thu5)
        },
        {
            key: 'Thu6',
            title: 'T6',
            render: (item) => renderDay(item.Thu6)
        },
        {
            key: 'Thu7',
            title: 'T7',
            render: (item) => renderDay(item.Thu7)
        },
        {
            key: 'CN',
            title: 'CN',
            render: (item) => renderDay(item.CN)
        }
    ];

    return (
        <Table
            columns={columns}
            data={capVes}
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
                        onClick={() => onDelete(item.MaCap)}
                    >
                        Delete
                    </Button>

                </div>
            )}
        />
    );
};

export default CapVeTable;

