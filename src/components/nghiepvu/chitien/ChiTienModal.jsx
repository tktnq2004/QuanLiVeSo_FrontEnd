import Modal      from '../../common/Modal/Modal';
import ChiTienForm from './ChiTienForm';

const ChiTienModal = ({ doiTacs, httts, selectedChiTien, onClose, onSuccess }) => {
    return (
        <Modal
            title={selectedChiTien ? 'Chỉnh sửa chi tiền' : 'Thêm chi tiền'}
            onClose={onClose}
        >
            <ChiTienForm
                doiTacs={doiTacs}
                httts={httts}
                selectedChiTien={selectedChiTien}
                onSuccess={onSuccess}
            />
        </Modal>
    );
};

export default ChiTienModal;