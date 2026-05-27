import Table from '../../common/Table/Table';

const HinhThucThanhToanTable = ({
    hinhthucthanhtoans
}) => {

    const columns = [
        {
            key: 'MaHT',
            title: 'Mã HT'
        },
        {
            key: 'TenHT',
            title: 'Tên hình thức'
        }
    ];

    return (
        <Table
            columns={columns}
            data={hinhthucthanhtoans}
        />
    );
};

export default HinhThucThanhToanTable;