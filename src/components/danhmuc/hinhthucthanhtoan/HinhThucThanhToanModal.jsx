import Modal from '../common/Modal/Modal';
import HinhThucThanhToanForm from './HinhThucThanhToanForm';

const HinhThucThanhToanModal = ({
    onClose,
    onSuccess
}) => {
    return (
        <Modal
            title="Add Hinh Thuc Thanh Toan"
            onClose={onClose}
        >
            <HinhThucThanhToanForm
                onSuccess={onSuccess}
                onClose={onClose}
            />
        </Modal>
    );

}
export default HinhThucThanhToanModal;