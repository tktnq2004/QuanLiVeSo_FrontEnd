import './Input.scss';

const Input = ({
    type = 'text',
    name,
    placeholder,
    value,
    onChange,
    disabled = false,
    label
}) => {

    return (
        <div className="input-group">
            {label && (
                <label className="input-label">{label}: </label>
            )}
            <input
                className="custom-input"
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
};

export default Input;