// Select.jsx
import './Select.scss';

const Select = ({
    name,
    value,
    onChange,
    options = [],
    valueField = 'value',
    labelField = 'label',
    label,
    disabled = false
}) => {

    return (
        <div className="select-group">
            {label && (
                <label className="select-label">{label}: </label>
            )}
            <select
                className="custom-select"
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            >
                <option value="">-- Select --</option>
                {options.map((item, index) => (
                    <option
                        key={index}
                        value={item[valueField]}
                    >
                        {item[labelField]}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;