import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Home from './views/Home';
import DoiTac from './views/danhmuc/DoiTac';
import DotPhatHanh from './views/danhmuc/DotPhatHanh';
import CapVe from './views/danhmuc/CapVe';
import CongTyXoSo from './views/danhmuc/CongTyXoSo';
import Nhom from './views/danhmuc/Nhom';
import HinhThucThanhToan from './views/danhmuc/HinhThucThanhToan';
import Phieu from './views/danhmuc/Phieu';
import SoCai from './views/danhmuc/SoCai';
import NhapVe from './views/nghiepvu/NhapVe';
import TraVe from './views/nghiepvu/TraVe';
import BanVe from './views/nghiepvu/BanVe';
import ThuVe from './views/nghiepvu/ThuVe';
import ThuTien from './views/nghiepvu/ThuTien';
import ChiTien from './views/nghiepvu/ChiTien';
import TKNhap from './views/thongke/thongkenhap';
import TKBan from './views/thongke/thongkeban';
import TKChi from './views/thongke/thongkechi';
import TKThu from './views/thongke/thongkethu';
import TKLoiNhuan from './views/thongke/thongkeloinhuan';
import TKCongNo from './views/thongke/congno';
import TKChiTietCongNo from './views/thongke/chitietcongno';
const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<Home />}>
                    <Route index element={<Navigate to="/CapVe" replace />} />
                    <Route path="/CapVe" element={<CapVe />} />
                    <Route path="/CongTyXoSo" element={<CongTyXoSo />} />
                    <Route path="/DoiTac" element={<DoiTac />} />
                    <Route path="/Nhom" element={<Nhom />} />
                    <Route path="/DotPhatHanh" element={<DotPhatHanh />} />
                    <Route path="/HinhThucThanhToan" element={<HinhThucThanhToan />} />
                    <Route path="/NhapVe" element={<NhapVe />} />
                    <Route path="/TraVe" element={<TraVe />} />
                    <Route path="/BanVe" element={<BanVe />} />
                    <Route path="/ThuVe" element={<ThuVe />} />
                    <Route path="/ThuTien" element={<ThuTien />} />
                    <Route path="/ChiTien" element={<ChiTien />} />
                    <Route path="/Phieu" element={<Phieu />} />
                    <Route path="/SoCai" element={<SoCai />} />
                    <Route path="/ThongKeNhap" element={<TKNhap />} />
                    <Route path="/ThongKeBan" element={<TKBan />} />
                    <Route path="/ThongKeChi" element={<TKChi />} />
                    <Route path="/ThongKeThu" element={<TKThu />} />
                    <Route path="/ThongKeLoiNhuan" element={<TKLoiNhuan />} />
                    <Route path="/ThongKeCongNo" element={<TKCongNo />} />
                    <Route path="/ThongKeChiTietCongNo" element={<TKChiTietCongNo />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
};


export default App;