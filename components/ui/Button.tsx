import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#2C1810] text-white hover:bg-[#1A0F0A] focus:ring-[#5D4037]',
    secondary: 'bg-[#8D6E63] text-white hover:bg-[#6F4E42] focus:ring-[#8D6E63]',
    outline: 'border border-[#D7CCC8] text-[#2C1810] hover:bg-[#F5F0E8] focus:ring-[#8D6E63]',
    ghost: 'text-[#2C1810] hover:bg-[#F5F0E8] focus:ring-[#8D6E63]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
