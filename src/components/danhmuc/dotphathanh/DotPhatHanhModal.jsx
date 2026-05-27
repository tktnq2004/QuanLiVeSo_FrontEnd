import Modal from '../../common/Modal/Modal';

import DotPhatHanhForm from './DotPhatHanhForm';

const DotPhatHanhModal = ({
    selectedDot,
    capves,
    onClose,
    onSuccess
}) => {

    return (
        <Modal
            title={
                selectedDot
                    ? 'Update Dot Phat Hanh'
                    : 'Add Dot Phat Hanh'
            }
            onClose={onClose}
        >

            <DotPhatHanhForm
                selectedDot={selectedDot}
                capves={capves}
                onSuccess={onSuccess}
            />

        </Modal>
    );
};

export default DotPhatHanhModal;