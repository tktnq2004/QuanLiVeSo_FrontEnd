import Modal from '../../common/Modal/Modal';
import CapVeForm from './CapVeForm';

const CapVeModal = ({
    congTys,
    selectedCapVe,
    onClose,
    onSuccess
}) => {
    return (
        <Modal
            title={selectedCapVe ? 'Edit Cặp Vé' : 'Add Cặp Vé'}
            onClose={onClose}
        >
            <CapVeForm
                congTys={congTys}
                selectedCapVe={selectedCapVe}
                onSuccess={onSuccess}
            />
        </Modal>
    );

}
export default CapVeModal;