import { useEffect, useState } from 'react';
import './TraVe.scss';

import socaiService       from '../../../services/socai.service';
import doitacService      from '../../../services/doitac.service';
import dotphathanhService from '../../../services/dotphathanh.service';

import TraVeForm  from './TraVeForm';
import TraVeTable from './TraVeTable';
import Button     from '../../common/Button/Button';

const LOAI_TRA_VE = 3;

const TraVeList = () => {

    const [nhaCungCap,  setNhaCungCap]  = useState([]);
    const [dotPhatHanh, setDotPhatHanh] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [loading,     setLoading]     = useState(false);

    const [formData, setFormData] = useState({
        MaDoiTac: '',
        NgayGiao: new Date().toISOString().split('T')[0],
        SoCT:     '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setDataLoading(true);
                const [doiTacData, dotData] = await Promise.all([
                    doitacService.getAll(),
                    dotphathanhService.getAll(),
                ]);
                setNhaCungCap(doiTacData);
                setDotPhatHanh(dotData);
            } catch (err) {
                alert(err?.response?.data?.message || 'Lỗi tải dữ liệu');
            } finally {
                setDataLoading(false);
            }
        };
        fetchData();
    }, []);

    const emptyRow = () => ({
        id:      Date.now() + Math.random(),
        MaDot:   '',
        VeE:     '',
        MenhGia: '',
        TyLe:    '',
        GiaTri:  '',
        TTTra:   '',
        GhiChu:  '',
    });

    const [rows,          setRows]          = useState([emptyRow()]);
    const [selectedRowId, setSelectedRowId] = useState(null);

    const handleSelectRow = (id) => {
        setSelectedRowId(prev => prev === id ? null : id);
    };

    const handleDeleteRow = () => {
        if (!selectedRowId) {
            alert('Vui lòng chọn hàng muốn xóa');
            return;
        }
        if (rows.length === 1) {
            alert('Phải có ít nhất 1 hàng');
            return;
        }
        setRows(prev => prev.filter(row => row.id !== selectedRowId));
        setSelectedRowId(null);
    };

    const handleReset = () => {
        setFormData({
            MaDoiTac: '',
            NgayGiao: new Date().toISOString().split('T')[0],
            SoCT:     '',
        });
        setRows([emptyRow()]);
        setSelectedRowId(null);
    };

    const handleSubmit = async () => {

        if (!formData.MaDoiTac) {
            alert('Vui lòng chọn nhà cung cấp');
            return;
        }
        if (!formData.NgayGiao) {
            alert('Vui lòng chọn ngày giao');
            return;
        }

        const validRows = rows.filter(row => row.MaDot);

        if (validRows.length === 0) {
            alert('Vui lòng nhập ít nhất 1 đợt phát hành');
            return;
        }

        try {
            setLoading(true);

            for (const row of validRows) {
                await socaiService.createPhieu({
                    NgayGiao:      formData.NgayGiao,
                    MaDoiTac:      formData.MaDoiTac,
                    SoCT:          formData.SoCT   || null,
                    Loai:          LOAI_TRA_VE,
                    MaDot:         row.MaDot,
                    SoLuong:       Number(row.VeE)     || 0,  // trả vé: SoLuong = VeE
                    DonGia:        Number(row.MenhGia) || 0,
                    VeE:           0,                          // trả vé không có dòng phụ
                    TyLeThanhToan: Number(row.TyLe)    || 0,
                    GhiChu:        row.GhiChu          || null,
                });
            }

            alert(`Lưu thành công ${validRows.length} phiếu`);
            handleReset();

        } catch (err) {
            alert(err?.response?.data?.message || 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    if (dataLoading) return <p>Đang tải dữ liệu...</p>;

    return (
        <>
            <TraVeForm
                nhaCungCap={nhaCungCap}
                formData={formData}
                onChange={setFormData}
            />

            <TraVeTable
                dotPhatHanh={dotPhatHanh}
                rows={rows}
                emptyRow={emptyRow}
                selectedRowId={selectedRowId}
                onRowsChange={setRows}
                onSelectRow={handleSelectRow}
            />

            <div className="trave__actions">
                <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Đang lưu...' : 'Lưu'}
                </Button>
                <Button variant="danger" onClick={handleDeleteRow} disabled={loading}>
                    Xóa hàng
                </Button>
            </div>
        </>
    );
};

export default TraVeList;