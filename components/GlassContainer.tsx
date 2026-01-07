
import React from 'react';

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassContainer: React.FC<GlassContainerProps> = ({ children, className = "" }) => {
  return (
    <div className={`glass rounded-3xl p-8 transition-all duration-500 hover:scale-[1.01] ${className}`}>
      {children}
    </div>
  );
};
