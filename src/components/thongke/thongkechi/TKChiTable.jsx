import Table from '../../common/Table/Table';

import formatCurrency from '../../../untils/formatCurrency';

const TKChiTable = ({
    records,
    handleDelete
}) => {

    const columns = [

        {
            key: 'SoCT',
            title: 'Số CT'
        },

        {
            key: 'NgayGiao',
            title: 'Ngày'
        },

        {
            key: 'TenDoiTac',
            title: 'Nhà cung cấp'
        },

        {
            key: 'SoTien',
            title: 'Số tiền'
        },

        {
            key: 'HTTT',
            title: 'Hình thức thanh toán'
        },
        {
            key: 'GhiChu',
            title: 'Về khoản'
        }
    ];


    return (

        <Table
            columns={columns}
            data={records}
            
        />
    );
};

export default TKChiTable;