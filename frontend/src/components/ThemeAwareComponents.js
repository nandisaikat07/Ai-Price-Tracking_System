import React from 'react';
import { FaInfoCircle, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

export const ThemeCard = ({ children, className = '', ...props }) => {
  return (
    <div className={`card theme-hover ${className}`} {...props}>
      {children}
    </div>
  );
};

export const ThemeButton = ({ children, variant = 'primary', className = '', ...props }) => {
  return (
    <button className={`btn btn-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const ThemeInput = ({ className = '', ...props }) => {
  return <input className={`input ${className}`} {...props} />;
};

export const ThemeAlert = ({ type = 'info', children }) => {
  const icons = {
    info: <FaInfoCircle className="text-blue-500" />,
    warning: <FaExclamationTriangle className="text-yellow-500" />,
    success: <FaCheckCircle className="text-green-500" />,
  };

  const colors = {
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    success: 'bg-green-100 text-green-800 border-green-200',
  };

  return (
    <div className={`theme-border ${colors[type]} p-4 rounded-lg flex items-center gap-3`}>
      {icons[type]}
      <div>{children}</div>
    </div>
  );
};

export const ThemeBadge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    accent: 'bg-accent text-white',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const ThemeDivider = ({ className = '' }) => {
  return (
    <div className={`h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent ${className}`} />
  );
};

export const ThemeProgress = ({ value, max = 100, className = '' }) => {
  return (
    <div className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-gradient-to-r from-primary to-primary-light transition-all duration-300"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );
}; 