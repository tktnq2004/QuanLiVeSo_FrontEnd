import Table from '../../common/Table/Table';

import Button from '../../common/Button/Button';

import formatCurrency from '../../../untils/formatCurrency';

const TKThuTable = ({
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
            title: 'Khách hàng'
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

export default TKThuTable;