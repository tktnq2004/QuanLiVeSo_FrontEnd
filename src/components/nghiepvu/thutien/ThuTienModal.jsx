import Modal from '../../common/Modal/Modal';
import ThuTienForm from './ThuTienForm';

const ThuTienModal = ({
    khachHangs,
    httts,
    selectedThuTien,
    onClose,
    onSuccess
}) => {
    return (
        <Modal
            title={selectedThuTien ? 'Edit Cặp Vé' : 'Add Cặp Vé'}
            onClose={onClose}
        >
            <ThuTienForm
                khachHangs={khachHangs}
                httts={httts}
                selectedThuTien={selectedThuTien}
                onSuccess={onSuccess}
            />
        </Modal>
    );

}
export default ThuTienModal;