import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    Ticket, UsersRound, Briefcase, Receipt,
    CreditCard, LayoutDashboard, UserRound,
    Calendar, Building, ChevronDown, ChevronRight,
    BookOpen, ClipboardList,
} from 'lucide-react';
import '../styles/Home.scss';

const danhMucItems = [
    { to: '/CapVe',             icon: Briefcase,  label: 'Cặp Vé' },
    { to: '/CongTyXoSo',        icon: Building,   label: 'Công Ty Xổ Số' },
    { to: '/DoiTac',            icon: UserRound,  label: 'Đối Tác' },
    { to: '/Nhom',              icon: UsersRound, label: 'Nhóm' },
    { to: '/DotPhatHanh',       icon: Calendar,   label: 'Đợt Phát Hành' },
    { to: '/HinhThucThanhToan', icon: CreditCard, label: 'Hình Thức Thanh Toán' },
];

const nghiepVuItems = [
    { to: '/NhapVe', icon: Ticket,  label: 'Nhập Vé' },
    { to: '/TraVe',   icon: Ticket,  label: 'Trả Vé' },
    { to: '/BanVe',   icon: Ticket,  label: 'Bán Vé' },
    { to: '/ThuVe',   icon: Ticket,  label: 'Thu Vé' },
    { to: '/ThuTien', icon: CreditCard, label: 'Thu Tiền' },
    { to: '/ChiTien', icon: CreditCard, label: 'Chi Tiền' }
];

const baoCaoItems = [
    { to: '/Phieu', icon: Ticket,  label: 'Phiếu' },
    { to: '/SoCai', icon: Receipt, label: 'Sổ Cái' },
];

const DashboardLayout = () => {

    const [openDanhMuc, setOpenDanhMuc] = useState(true);
    const [openNghiepVu, setOpenNghiepVu] = useState(true);
    const [openBaoCao, setOpenBaoCao] = useState(true);

    const renderGroup = (label, GroupIcon, items, open, setOpen) => (
        <div className="sidebar__group">

            <button
                className="sidebar__group-header"
                onClick={() => setOpen(prev => !prev)}
            >
                <div className="sidebar__group-header-left">
                    <GroupIcon size={16} />
                    <span>{label}</span>
                </div>
                {open
                    ? <ChevronDown size={14} />
                    : <ChevronRight size={14} />
                }
            </button>

            {open && (
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

        </div>
    );

    return (
        <div className="dashboard">

            <aside className="sidebar">

                <div className="sidebar__brand">
                    <LayoutDashboard size={20} />
                    <span>Vé Số</span>
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