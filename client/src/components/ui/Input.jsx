export const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  error,
  required = false,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 rounded-xl border ${
          error ? 'border-danger' : 'border-gray-300'
        } focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200`}
      />
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
};
