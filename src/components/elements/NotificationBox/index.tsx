import React, { useState } from 'react';

export enum NotificationStyle {
  information = 0,
  warning = 1,
  error = 2,
}

export interface NotificationBoxProps {
  text: string,
  boxStyle?: NotificationStyle,
};

const styleColor = [
  {
    normal: '#FFFFFF',
    dark: '#FCFCFC',
  },
  {
    normal: '#FFFFFF',
    dark: '#CCCCCC',
  },
  {
    normal: '#FFFFFF',
    dark: '#CCCCCC',
  },
];

export const NotificationBox : React.FC<NotificationBoxProps> = ({text, boxStyle = NotificationStyle.information}) => {
  const bgColor = styleColor[boxStyle].normal;
  const bgColorDark = styleColor[boxStyle].dark;
  
  return (
    <div
      className='bg-white rounded-lg py-2 px-3 drop-shadow'
      style={
        {
          background: `linear-gradient(${bgColor}, ${bgColorDark})`,
        }
      }
    >
      <span>{text}</span>
    </div>
  );
};
