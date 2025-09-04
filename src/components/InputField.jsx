const InputField = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  tooltip = '',
  className = 'form-control mb-3'
}) => {
  return (
    <div>
      <label htmlFor={name} className="form-label">{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        required
        data-bs-toggle={tooltip ? "tooltip" : undefined}
        title={tooltip}
      />
    </div>
  );
};

export default InputField;
