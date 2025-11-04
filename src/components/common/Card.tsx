import React from 'react';
import '../../styles/Card.css';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'glass' | 'elevated';
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hover = true,
  onClick,
}) => {
  return (
    <div
      className={`custom-card card-${variant} ${hover ? 'card-hover' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
