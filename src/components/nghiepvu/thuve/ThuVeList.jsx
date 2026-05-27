import { useState } from 'react';
import './ThuVe.scss';
import ThuVeTable from './ThuVeTable';
import ThuVeForm from './ThuVeForm';
import Button from '../../common/Button/Button';

const ThuVeList = ({ dotPhatHanh, nhaCungCap, kyXoOptions }) => {

  const [formData, setFormData] = useState({
    MaNCC: '',
    NgayTao: new Date().toISOString().split('T')[0],
  });

  const emptyRow = () => ({
    id: Date.now(),
    MaKySo: '', VeE: '', DonGia: '', TTNhap: '', GhiChu: ''
  });

  const [rows, setRows] = useState([emptyRow()]);

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

  const handleSubmit = () => {

    const payload = {
      ...formData,
      chiTiet: rows.filter(row => row.MaKySo)
    };

    console.log('Submit payload:', payload);

  };

  return (
    <>
      <ThuVeForm
        dotPhatHanh={dotPhatHanh}
        nhaCungCap={nhaCungCap}
        formData={formData}
        onChange={setFormData}
      />

      <ThuVeTable
        kyXoOptions={kyXoOptions}
        rows={rows}
        emptyRow={emptyRow}
        selectedRowId={selectedRowId}
        onRowsChange={setRows}
        onSelectRow={handleSelectRow}
      />

      <div className="thuve__actions">

        <Button onClick={handleSubmit}>
          Lưu
        </Button>

        <Button
          variant="danger"
          onClick={handleDeleteRow}
        >
          Xóa hàng
        </Button>
      </div>
    </>
  );
};

export default ThuVeList;