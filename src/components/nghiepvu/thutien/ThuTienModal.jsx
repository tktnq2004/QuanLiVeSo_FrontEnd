import Modal      from '../../common/Modal/Modal';
import ThuTienForm from './ThuTienForm';

const ThuTienModal = ({ khachHangs, httts, selectedThuTien, onClose, onSuccess }) => {
    return (
        <Modal
            title={selectedThuTien ? 'Chỉnh sửa thu tiền' : 'Thêm thu tiền'}
            onClose={onClose}
        >
            <ThuTienForm
                khachHangs={khachHangs}
                httts={httts}
                selectedThuTien={selectedThuTien}
                onSuccess={onSuccess}
            />
        </Modal>
    );
};

export default ThuTienModal;