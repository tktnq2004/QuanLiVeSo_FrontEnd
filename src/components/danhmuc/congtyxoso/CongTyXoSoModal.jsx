import Modal from "../../common/Modal/Modal";
import CongTyXoSoForm from "./CongTyXoSoForm";

const CongTyXoSoModal = ({ selectedCongty, onClose, onSuccess }) => {
    return (
        <Modal
            title={selectedCongty ? 'Edit Công Ty Xổ Số' : 'Add Công Ty Xổ Số'}
            onClose={onClose}
        >
            <CongTyXoSoForm
                selectedCongty={selectedCongty}
                onSuccess={onSuccess}
            />
        </Modal>
    );
}
export default CongTyXoSoModal;