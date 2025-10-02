'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface KidsButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'fun' | 'rainbow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  animate?: boolean;
}

const KidsButton: React.FC<KidsButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  icon,
  animate = true,
}) => {
  const baseClasses = 'font-display font-bold rounded-fun transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-opacity-50 active:scale-95 flex items-center justify-center gap-2';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-kids-pink to-kids-purple text-white hover:from-kids-purple hover:to-kids-pink shadow-kids focus:ring-kids-pink',
    secondary: 'bg-gradient-to-r from-kids-blue to-kids-cyan text-white hover:from-kids-cyan hover:to-kids-blue shadow-fun focus:ring-kids-blue',
    fun: 'bg-gradient-to-r from-kids-yellow to-kids-orange text-gray-800 hover:from-kids-orange hover:to-kids-red hover:text-white shadow-fun focus:ring-kids-yellow',
    rainbow: 'bg-gradient-rainbow text-white hover:shadow-glow shadow-fun focus:ring-kids-pink animate-pulse-slow',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed transform-none' 
    : 'hover:scale-105 cursor-pointer';

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  const buttonContent = (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );

  if (animate && !disabled) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {buttonContent}
      </motion.div>
    );
  }

  return buttonContent;
};

export default KidsButton;
