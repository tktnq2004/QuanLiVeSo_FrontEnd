import './FormRow.scss';

const FormRow = ({ children }) => {

    return (
        <div className="form-row">
            {children}
        </div>
    );
};

export default FormRow;