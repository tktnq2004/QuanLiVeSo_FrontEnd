import Modal from '../../common/Modal/Modal';
import ChiTienForm from './ChiTienForm';

const ChiTienModal = ({
    khachHangs,
    httts,
    selectedChiTien,
    onClose,
    onSuccess
}) => {
    return (
        <Modal
            title={selectedChiTien ? 'Edit Chi Tiển' : 'Add Chi Tiển'}
            onClose={onClose}
        >
            <ChiTienForm
                khachHangs={khachHangs}
                httts={httts}
                selectedChiTien={selectedChiTien}
                onSuccess={onSuccess}
            />
        </Modal>
    );

}
export default ChiTienModal;