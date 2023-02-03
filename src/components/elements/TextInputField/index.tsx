import React, { useState, forwardRef, ForwardedRef, memo } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form/dist/types';

export interface TextInputFieldProps {
  text: string,
  name: string,
  type: React.HTMLInputTypeAttribute,
  className?: string,
  useFormRegister?: UseFormRegisterReturn,
  error?: string,
};

export const TextInputField: React.FC<TextInputFieldProps> = ({
  text,
  name,
  type,
  className = '',
  useFormRegister = undefined,
  error = undefined,
}) => {
  return (
    <div className='w-full'>
      <input
        type={type}
        className={`p-2 border-2 border-gray-300 rounded-lg outline-none ${className}`}
        placeholder={`${text}`}
        name={name}
        {...useFormRegister}
      />
      {
        error ?
        <span className='block text-sm text-red-500'>{error}</span>
        :
        null
      }
    </div>
  );
};
