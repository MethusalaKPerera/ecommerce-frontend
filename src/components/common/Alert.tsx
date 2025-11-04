import React from 'react';
import '../../styles/Alert.css';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
  icon?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  onClose,
  icon,
}) => {
  const defaultIcons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className={`alert alert-${variant}`}>
      <span className="alert-icon">{icon || defaultIcons[variant]}</span>
      <span className="alert-content">{children}</span>
      {onClose && (
        <button className="alert-close" onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;