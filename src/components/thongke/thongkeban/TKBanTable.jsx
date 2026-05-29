import Table from '../../common/Table/Table';

import formatCurrency from '../../../untils/formatCurrency';

const TKBanTable = ({
    records,
    handleDelete
}) => {

    const columns = [

        {
            key: 'MaKySo',
            title: 'Mã kỳ số'
        },

        {
            key: 'SoCT',
            title: 'Số CT'
        },

        {
            key: 'NgayGiao',
            title: 'Ngày giao'
        },

        {
            key: 'ChuThich',
            title: 'Diễn giải'
        },

        {
            key: 'MaDoiTac',
            title: 'Mã KH'
        },
        {
            key: 'TenDoiTac',
            title: 'Khách hàng'
        },

        {
            key: 'SoCap',
            title: 'Số cặp'
        },

        {
            key: 'MenhGiaCap',
            title: 'Mệnh giá cặp'
        },

        {
            key: 'GiaTri',
            title: 'Giá trị'
        },

        {
            key: 'VeE',
            title: 'Vé ế'
        },

        {
            key: 'ThucBan',
            title: 'Thực Bán'
        }
    ];

    return (

        <Table
            columns={columns}
            data={records}

        />
    );
};

export default TKBanTable;