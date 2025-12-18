import React from 'react';

interface GradientButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg';
}

const GradientButton: React.FC<GradientButtonProps> = ({
  onClick,
  children,
  className = '',
  disabled = false,
  type = 'button',
  size = 'lg'
}) => {
  const sizeClasses = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-gradient-to-r from-cyan-400 via-sky-500 to-fuchsia-500 
        text-white rounded-[12px] font-semibold 
        shadow-lg hover:shadow-cyan-500/50 
        hover:from-cyan-300 hover:via-sky-400 hover:to-fuchsia-400 
        transform hover:scale-105 
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default GradientButton;
