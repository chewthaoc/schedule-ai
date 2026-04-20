import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#2C1810] mb-1.5">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-4 py-2 rounded-lg border border-[#D7CCC8] bg-white text-[#2C1810]',
          'focus:outline-none focus:ring-2 focus:ring-[#8D6E63] focus:border-transparent',
          'placeholder:text-[#BCAAA4] transition-all',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#2C1810] mb-1.5">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'w-full px-4 py-2 rounded-lg border border-[#D7CCC8] bg-white text-[#2C1810]',
          'focus:outline-none focus:ring-2 focus:ring-[#8D6E63] focus:border-transparent',
          'placeholder:text-[#BCAAA4] transition-all resize-none',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
