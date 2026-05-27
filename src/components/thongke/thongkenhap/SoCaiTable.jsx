import Table from '../../common/Table/Table';

import Button from '../../common/Button/Button';

import formatCurrency from '../../../untils/formatCurrency';

const SoCaiTable = ({
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
            title: 'Mã NCC'
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
            key: 'ThucNhap',
            title: 'Thực nhập'
        }
    ];


    return (

        <Table
            columns={columns}
            data={records.map(item => ({
                ...item,
            }))}
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