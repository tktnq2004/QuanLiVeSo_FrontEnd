import Table from '../../common/Table/Table';
import Button from '../../common/Button/Button';

import formatDate from '../../../untils/formatDate';

const PhieuTable = ({
    phieus,
    onDelete
}) => {

    const columns = [

        {
            key: 'NgayGiao',
            title: 'Ngày giao',
            render: (row) => formatDate(row.NgayGiao),
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