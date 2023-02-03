import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface EventBoxProps {
  name: string,
  date: string,
  location: string,
  participants: number,
  imageUrl: string,
  clickUrl: string,
};

export const EventBox : React.FC<EventBoxProps> = ({name, date, location, participants, imageUrl, clickUrl}) => {
  return (
      <div className='w-[300px] bg-white drop-shadow border-[1px] border-gray-200 rounded-xl overflow-hidden whitespace-nowrap'>
        <Link href={clickUrl} className='w-fit h-fit'>
          <Image
            src={imageUrl}
            alt='Profile Picture'
            className='w-full h-[150px] object-cover'
            width={200}
            height={200}
            unoptimized
          />
          <div className='px-3 pt-1 pb-2'>
            <span className='block font-bold text-lg text-ellipsis overflow-hidden'>{name}</span>
            <span className='block text-gray-500 text-md text-ellipsis overflow-hidden'>{date}</span>
            <span className='block text-gray-500 text-md text-ellipsis overflow-hidden'>{location}</span>
            <span className='block text-md text-gray-600 font-bold text-ellipsis overflow-hidden'>{participants} Participants</span>
          </div>
        </Link>
      </div>
  );
};
