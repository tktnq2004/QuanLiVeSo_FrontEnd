import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    Layers, Building2, Handshake, Users, CalendarRange,
    Wallet, FileText, BookMarked,
    PackagePlus, Undo2, Tag, PackageCheck,
    ArrowDownCircle, ArrowUpCircle,
    BarChart2, TrendingUp, TrendingDown, PiggyBank,
    LayoutDashboard, ChevronDown, ChevronRight,
    BookOpen, ClipboardList, Receipt,
    PanelLeftClose, PanelLeftOpen,
} from 'lucide-react';
import '../styles/Home.scss';

const danhMucItems = [
    { to: '/CapVe', icon: Layers, label: 'Cặp Vé' },
    { to: '/CongTyXoSo', icon: Building2, label: 'Công Ty Xổ Số' },
    { to: '/DoiTac', icon: Handshake, label: 'Đối Tác' },
    { to: '/Nhom', icon: Users, label: 'Nhóm' },
    { to: '/DotPhatHanh', icon: CalendarRange, label: 'Đợt Phát Hành' },
    { to: '/HinhThucThanhToan', icon: Wallet, label: 'Hình Thức Thanh Toán' },
    { to: '/Phieu', icon: FileText, label: 'Phiếu' },
    { to: '/SoCai', icon: BookMarked, label: 'Sổ Cái' },
];

const nghiepVuItems = [
    { to: '/NhapVe', icon: PackagePlus, label: 'Nhập Vé' },
    { to: '/TraVe', icon: Undo2, label: 'Trả Vé' },
    { to: '/BanVe', icon: Tag, label: 'Bán Vé' },
    { to: '/ThuVe', icon: PackageCheck, label: 'Thu Vé' },
    { to: '/ThuTien', icon: ArrowDownCircle, label: 'Thu Tiền' },
    { to: '/ChiTien', icon: ArrowUpCircle, label: 'Chi Tiền' },
];

const baoCaoItems = [
    { to: '/ThongKeNhap', icon: BarChart2, label: 'Thống kê nhập' },
    { to: '/ThongKeBan', icon: TrendingUp, label: 'Thống kê bán' },
    { to: '/ThongKeChi', icon: TrendingDown, label: 'Thống kê chi' },
    { to: '/ThongKeThu', icon: ArrowDownCircle, label: 'Thống kê thu' },
    { to: '/ThongKeLoiNhuan', icon: PiggyBank, label: 'Thống kê lợi nhuận' },
    { to: '/ThongKeCongNo', icon: FileText, label: 'Công nợ' },
    { to: '/ThongKeChiTietCongNo', icon: BookOpen, label: 'Chi tiết công nợ' },
];

const DashboardLayout = () => {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [openDanhMuc, setOpenDanhMuc] = useState(false);
    const [openNghiepVu, setOpenNghiepVu] = useState(false);
    const [openBaoCao, setOpenBaoCao] = useState(false);

    const renderGroup = (label, GroupIcon, items, open, setOpen) => (
        <div className="sidebar__group">

            <button
                className="sidebar__group-header"
                onClick={() => setOpen(prev => !prev)}
                title={!sidebarOpen ? label : undefined}
            >
                {sidebarOpen && (
                    <div className="sidebar__group-header-left">
                        <GroupIcon size={16} />
                        <span>{label}</span>
                    </div>
                )}
                {sidebarOpen && (
                    open
                        ? <ChevronDown size={14} />
                        : <ChevronRight size={14} />
                )}
            </button>

            {open && sidebarOpen && (
                <div className="sidebar__group-items">
                    {items.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            to={to}
                            key={to}
                            className={({ isActive }) =>
                                `sidebar__item ${isActive ? 'sidebar__item--active' : ''}`
                            }
                        >
                            <Icon size={18} />
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </div>
            )}

            {/* Collapsed mode: show icon-only items */}
            {!sidebarOpen && (
                <div className="sidebar__group-items">
                    {items.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            to={to}
                            key={to}
                            title={label}
                            className={({ isActive }) =>
                                `sidebar__item sidebar__item--icon-only ${isActive ? 'sidebar__item--active' : ''}`
                            }
                        >
                            <Icon size={18} />
                        </NavLink>
                    ))}
                </div>
            )}

        </div>
    );

    return (
        <div className={`dashboard ${sidebarOpen ? '' : 'dashboard--collapsed'}`}>

            <aside className="sidebar">

                <div className="sidebar__brand">
                    {sidebarOpen && (
                        <>
                            <LayoutDashboard size={20} />
                            <span>Vé Số</span>
                        </>
                    )}
                    <button
                        className="sidebar__toggle"
                        onClick={() => setSidebarOpen(prev => !prev)}
                        title={sidebarOpen ? 'Đóng menu' : 'Mở menu'}
                    >
                        {sidebarOpen
                            ? <PanelLeftClose size={18} />
                            : <PanelLeftOpen size={18} />
                        }
                    </button>
                </div>

                <nav className="sidebar__nav">
                    {renderGroup('Danh Mục', BookOpen, danhMucItems, openDanhMuc, setOpenDanhMuc)}
                    {renderGroup('Nghiệp Vụ', ClipboardList, nghiepVuItems, openNghiepVu, setOpenNghiepVu)}
                    {renderGroup('Báo Cáo', Receipt, baoCaoItems, openBaoCao, setOpenBaoCao)}
                </nav>

            </aside>

            <main className="dashboard__content">
                <Outlet />
            </main>

        </div>
    );
};

export default DashboardLayout;