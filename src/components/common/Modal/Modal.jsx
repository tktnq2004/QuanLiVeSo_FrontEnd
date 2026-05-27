import './Modal.scss';

const Modal = ({
    title,
    children,
    onClose
}) => {

    return (

        <div className="modal-overlay">

            <div className="modal-container">

                <div className="modal-header">

                    <h3>{title}</h3>

                    <button onClick={onClose}>
                        X
                    </button>

                </div>

                <div className="modal-body">
                    {children}
                </div>

            </div>

        </div>
    );
};

export default Modal;