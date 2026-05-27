import Modal from '../../common/Modal/Modal';

import SoCaiForm from './SoCaiForm';

const SoCaiModal = ({
    onClose,
    onSuccess
}) => {

    return (

        <Modal
            title="Add So Cai"
            onClose={onClose}
        >

            <SoCaiForm
                onSuccess={onSuccess}
            />

        </Modal>
    );
};

export default SoCaiModal;