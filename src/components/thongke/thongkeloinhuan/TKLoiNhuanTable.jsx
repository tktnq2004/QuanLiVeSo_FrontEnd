import Table from '../../common/Table/Table';

import formatCurrency from '../../../untils/formatCurrency';

const TKLoiNhuanTable = ({
    records,
    handleDelete
}) => {

    const columns = [

        {
            key: 'MaKySo',
            title: 'Mã kỳ số'
        },

        {
            key: 'NgaySo',
            title: 'Ngày số'
        },

        {
            key: 'ThanhTienBan',
            title: 'Thành tiền bán'
        },

        {
            key: 'ThanhTienVon',
            title: 'Thanh tiền vốn'
        },

        {
            key: 'LoiNhuan',
            title: 'Lợi nhuận'
        },
        {
            key: 'LNPhanTram',
            title: '(%) Lợi nhuận'
        }
    ];


    return (

        <Table
            columns={columns}
            data={records}
        />
    );
};

export default TKLoiNhuanTable;