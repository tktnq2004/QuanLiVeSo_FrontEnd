import { useEffect, useState } from 'react';

import hinhthucthanhtoanService from '../../../services/hinhthucthanhtoan.service';
import HinhThucThanhToanTable from './HinhThucThanhToanTable';

const HinhThucThanhToanList = () => {

    const [hinhthucthanhtoans,
        setHinhThucThanhToans] = useState([]);

    const [loading, setLoading] = useState(false);

    const loadData = async () => {

        try {

            setLoading(true);

            const data =
                await hinhthucthanhtoanService.getAll();

            setHinhThucThanhToans(data);

        } catch (err) {

            console.log(err);

            // alert(
            //     'Không thể tải hình thức thanh toán'
            // );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>

            {
                loading
                    ? (
                        <p>Loading...</p>
                    )
                    : (
                        <HinhThucThanhToanTable
                            hinhthucthanhtoans={
                                hinhthucthanhtoans
                            }
                        />
                    )
            }

        </div>
    );
};

export default HinhThucThanhToanList;