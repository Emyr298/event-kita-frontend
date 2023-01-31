import React, { useState } from 'react';
import { styles } from '@/common/constants/styles';

export enum ButtonStyle {
  elevated = 0,
  textOnly = 1,
};

export interface ButtonProps {
  text: string,
  buttonStyle?: ButtonStyle,
  onPressed?: () => void,
  className?: string,
  bgColor?: string,
  bgColorDark?: string,
  textColor?: string,
};

export const Button : React.FC<ButtonProps> = ({
  text,
  bgColor = styles.mainColor,
  bgColorDark = styles.mainColorDark,
  textColor = styles.baseTextColor2,
  buttonStyle = ButtonStyle.elevated,
  className = '',
  onPressed = () => {},
}) => {
  if (buttonStyle === ButtonStyle.textOnly) {
    bgColor = 'transparent';
    bgColorDark = 'transparent';
  }
  
  return (
    <button
      className={`rounded-lg ${className}`}
      style={
        {
          background: `linear-gradient(${bgColor}, ${bgColorDark})`,
        }
      }
      onClick={onPressed}
    >
      <div className={`py-2 px-3 rounded-lg  ${buttonStyle === ButtonStyle.textOnly ? '' : 'hover:bg-[rgba(0,0,0,0.075)]'}`}>
        <span style={{color: textColor}}>{text}</span>
      </div>
    </button>
  );
};
