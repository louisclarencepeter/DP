// FormSelect.jsx
import PropTypes from "prop-types";

const FormSelect = ({
  label,
  id,
  name,
  value,
  options,
  onChange,
  required = false,
  autoComplete = "off",
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete || "off"}
        aria-required={required === true ? "true" : "false"}
        className="form-control"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option, index) => (
          <option key={`${option}-${index}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
};

export default FormSelect;
