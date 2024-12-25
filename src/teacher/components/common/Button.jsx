import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button' 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`teacher-container button ${variant}`}
    >
      {children}
    </button>
  );
};

export default Button;