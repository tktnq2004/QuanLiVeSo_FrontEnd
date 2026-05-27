import './ConfirmDialog.scss';

const ConfirmDialog = ({
    message,
    onConfirm,
    onCancel
}) => {

    return (
        <div className="dialog-overlay">

            <div className="dialog-box">

                <p>{message}</p>

                <div className="dialog-actions">

                    <button onClick={onConfirm}>
                        Confirm
                    </button>

                    <button onClick={onCancel}>
                        Cancel
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ConfirmDialog;