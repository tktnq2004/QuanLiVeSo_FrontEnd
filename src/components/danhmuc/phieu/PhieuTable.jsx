import Table from '../../common/Table/Table';
import Button from '../../common/Button/Button';

const PhieuTable = ({
    phieus,
    onDelete
}) => {

    const columns = [

        {
            key: 'ID',
            title: 'ID'
        },

        {
            key: 'NgayGiao',
            title: 'Ngày giao'
        },

        {
            key: 'TenDoiTac',
            title: 'Đối tác'
        },

        {
            key: 'Loai',
            title: 'Loại'
        },

        {
            key: 'LoaiChiTiet',
            title: 'Loại chi tiết'
        },

        {
            key: 'SoCT',
            title: 'Số CT'
        },

        {
            key: 'TenHT',
            title: 'Hình thức TT'
        }
    ];

    return (

        <Table
            columns={columns}
            data={phieus}
            renderActions={(item) => (

                <Button
                    variant="danger"
                    onClick={() =>
                        onDelete(item.ID)
                    }
                >
                    Delete
                </Button>
            )}
        />
    );
};

export default PhieuTable;