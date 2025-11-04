import React from 'react';
import '../../styles/Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  placeholder,
  label,
  error,
  icon,
  fullWidth = false,
  required = false,
  ...props
}, ref) => {
  return (
    <div className="input-wrapper" style={fullWidth ? { width: '100%' } : undefined}>
      {label && (
        <label className="input-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <div className={`input-container ${error ? 'input-error' : ''}`}>
        {icon && <span className="input-icon">{icon}</span>}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          required={required}
          className="custom-input"
          {...props}
        />
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;