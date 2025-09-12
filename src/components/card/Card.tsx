import React from 'react';

interface CardProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className = '', style = {}, children }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-xl p-8 md:p-12 ${className}`}
      style={{ border: '1px solid #59595933', ...style }}
    >
      {children}
    </div>
  );
};

export default Card;
