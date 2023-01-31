import React, { useState } from 'react';

export interface TextInputFieldProps {
  text: string,
  className?: string,
  isPassword?: boolean,
};

export const TextInputField : React.FC<TextInputFieldProps> = ({
  text,
  className = '',
  isPassword = false,
}) => {
  return (
    <input
      type={isPassword ? 'password' : 'text'}
      className={`p-2 border-2 border-gray-300 rounded-lg outline-none ${className}`}
      placeholder={`${text}`}
    />
  );
};
