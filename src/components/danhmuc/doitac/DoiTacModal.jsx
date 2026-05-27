import Modal from '../../common/Modal/Modal';

import DoiTacForm from './DoiTacForm';

const DoiTacModal = ({
    selectedDoiTac,
    nhoms,
    onClose,
    onSuccess
}) => {

    return (
        <Modal
            title={
                selectedDoiTac
                    ? 'Update DoiTac'
                    : 'Add DoiTac'
            }
            onClose={onClose}
        >

            <DoiTacForm
                selectedDoiTac={selectedDoiTac}
                nhoms={nhoms}
                onSuccess={onSuccess}
            />

        </Modal>
    );
};

export default DoiTacModal;