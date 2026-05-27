import './CheckBox.scss';

const Checkbox = ({
    label,
    name,
    checked,
    onChange,
    disabled = false
}) => {

    return (

        <label className="custom-checkbox">

            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />

            <span className="checkmark"></span>

            {
                label && (
                    <span className="checkbox-label">
                        {label}
                    </span>
                )
            }

        </label>
    );
};

export default Checkbox;