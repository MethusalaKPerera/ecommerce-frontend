import React from 'react';
import '../../styles/Badge.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  pill?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  pill = false,
}) => {
  return (
    <span className={`badge badge-${variant} badge-${size} ${pill ? 'badge-pill' : ''}`}>
      {children}
    </span>
  );
};

export default Badge;