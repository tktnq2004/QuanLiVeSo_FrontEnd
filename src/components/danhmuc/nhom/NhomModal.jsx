import Modal from '../../common/Modal/Modal';
import NhomForm from './NhomForm';

const NhomModal = ({ selectedNhom, onClose, onSuccess }) => {
    return (
        <Modal
            title={selectedNhom ? 'Edit Nhóm' : 'Add Nhóm'}
            onClose={onClose}
        >
            <NhomForm
                selectedNhom={selectedNhom}
                onSuccess={onSuccess}
            />
        </Modal>
    );
};

export default NhomModal;