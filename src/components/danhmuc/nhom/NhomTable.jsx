import Table from '../../common/Table/Table';
import Button from '../../common/Button/Button';

const NhomTable = ({ nhoms, onEdit, onDelete }) => {

    // ✅
    const columns = [
        { key: 'MaNhom', title: 'Mã nhóm' },
        { key: 'TenNhom', title: 'Tên nhóm' }
    ];


    return (
        <Table
            columns={columns}
            data={nhoms}
            renderActions={(item) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button onClick={() => onEdit(item)}>
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => onDelete(item.MaNhom)}
                    >
                        Delete
                    </Button>
                </div>
            )}
        />
    );
};

export default NhomTable;