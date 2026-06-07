import Table from '../../common/Table/Table';

import Button from '../../common/Button/Button';

import formatCurrency from '../../../untils/formatCurrency';
import formatDate from '../../../untils/formatDate';

const SoCaiTable = ({
    records,
    handleDelete
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
            key: 'TenDot',
            title: 'Đợt phát hành'
        },

        {
            key: 'LoaiText',
            title: 'Loại'
        },

        {
            key: 'SoLuong',
            title: 'Số lượng'
        },

        {
            key: 'DonGia',
            title: 'Đơn giá'
        },

        {
            key: 'TyLeThanhToan',
            title: 'Tỷ lệ TT'
        },

        {
            key: 'TienTra',
            title: 'Tiền trả'
        },

        {
            key: 'ThanhTien',
            title: 'Thành tiền'
        }
    ];

    const formattedData = records.map(
        (item) => ({

            ...item,

            LoaiText:
                item.Loai === 1
                    ? 'Cấp vé'
                    : 'Trả vé',

            DonGia:
                formatCurrency(item.DonGia),

            TienTra:
                formatCurrency(item.TienTra),

            ThanhTien:
                formatCurrency(item.ThanhTien)
        })
    );

    return (

        <Table
            columns={columns}
            data={formattedData}
            renderActions={(item) => (

                <Button
                    variant="danger"
                    onClick={() =>
                        handleDelete(item.ID)
                    }
                >
                    Delete
                </Button>
            )}
        />
    );
};

export default SoCaiTable;