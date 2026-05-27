import Modal from '../../common/Modal/Modal';

import PhieuForm from './PhieuForm';

const PhieuModal = ({
    selectedPhieu,
    onClose,
    onSuccess
}) => {

    return (

        <Modal
            title={
                selectedPhieu
                    ? 'Update Phiếu'
                    : 'Add Phiếu'
            }
            onClose={onClose}
        >

            <PhieuForm
                selectedPhieu={selectedPhieu}
                onSuccess={onSuccess}
                onClose={onClose}
            />

        </Modal>
    );
};

export default PhieuModal;