import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button } from '../Button';
import { logoutUser } from '@/common/utils/client/auth';
import { User } from '@/common/models/user';
import { UserInformation } from '@/common/utils/server/auth';
import Image from 'next/image';
import { formatDate } from '@/common/utils/client/format';

export interface NavBarProps {
  userInfo: UserInformation,
};

export const NavBar : React.FC<NavBarProps> = ({ userInfo }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav>
      <div className='w-full h-[64px] fixed top-0 bg-white drop-shadow flex flex-row justify-between items-center z-50'>
        <div className='ml-4 flex flex-row items-center gap-6'>
          <Link href='/'>
            <span className='text-2xl'><span className='font-bold'>Event</span>Kita</span>
          </Link>
          <div className='hidden lg:block'>
            <div className='flex flex-row items-center gap-4'>
              <Link href='/'><span className='block'>Home</span></Link>
              <Link href='/events'><span className='block'>Events</span></Link>
              {
                userInfo.information ?
                <Link href='/events/joined'><span className='block'>Joined Events</span></Link>
                : null
              }
            </div>
          </div>
        </div>
        <div className='block lg:hidden'>
          <Button
            text={isMenuOpen ? 'Close' : 'Menu'}
            className='font-bold mr-4'
            onPressed={() => {setIsMenuOpen(prev => (!prev))}}
          />
        </div>
        {
          userInfo.information ?
          <div className='hidden lg:block'>
            <div className='flex flex-row items-center gap-4'>
              <button onClick={() => {setIsMenuOpen(prev => (!prev))}} className='px-4 hover:bg-[rgba(0,0,0,0.1)] h-[64px] flex flex-row items-center gap-2'>
                <div className='bg-black w-[40px] h-[40px] rounded-full overflow-hidden'>
                  <Image
                    src={userInfo.information.photo_url}
                    alt='Profile Picture'
                    className='w-full h-full object-cover'
                    width='40'
                    height='40'
                    unoptimized
                    priority
                  />
                </div>
                <div className='flex flex-col items-start'>
                  <span className='font-bold block'>{`${userInfo.information.first_name} ${userInfo.information.last_name}`}</span>
                  {
                    isMenuOpen ?
                    <>
                      <span className='block text-[0.75rem] text-gray-600'>{`${userInfo.information.email}`}</span>
                      <span className='block text-[0.75rem] text-gray-600'>{`Registered on ${formatDate(new Date(userInfo.information.register_time))}`}</span>
                    </> :
                    null
                  }
                </div>
              </button>
            </div>
          </div>
          :
          <div className='hidden lg:block'>
            <div className='flex flex-row items-center gap-2 mr-4'>
              <Button
                text='Login'
                className='font-bold'
                onPressed={() => {
                  router.replace('/login');
                }}
              />
              {/* <Button
                text='Register'
                className='font-bold'
                onPressed={() => {
                  router.replace('/register');
                }}
              /> */}
            </div>
          </div>
        }
      </div>
      <div className={`fixed top-[64px] w-full bg-white drop-shadow z-40 flex flex-col ${isMenuOpen ? 'block lg:hidden' : 'hidden'}`}>
        {
          userInfo.information ?
          <div className='flex flex-col items-center py-4'>
            <div className='bg-black w-[100px] h-[100px] rounded-full overflow-hidden'>
              <Image
                src={userInfo.information.photo_url}
                alt='Profile Picture'
                className='w-full h-full object-cover'
                width='40'
                height='40'
                unoptimized
                priority
              />
            </div>
            <div className='flex flex-col items-center'>
              <span className='font-bold block'>{`${userInfo.information.first_name} ${userInfo.information.last_name}`}</span>
              <span className='block text-[0.9rem] text-gray-600'>{`${userInfo.information.email}`}</span>
              <span className='block text-[0.9rem] text-gray-600'>{`Registered on ${formatDate(new Date(userInfo.information.register_time))}`}</span>
            </div>
          </div>
          :
          <div className='flex flex-col items-center py-4'>
            <Button
              text='Login'
              className='font-bold'
              onPressed={() => {
                router.replace('/login');
              }}
            />
          </div>
        }
        <div className='border-[1px] border-gray-200'></div>
        <div className='flex flex-col items-center gap-2 pt-2'>
          <Link href='/'><span className='block font-bold'>Home</span></Link>
          <div className='border-[1px] border-gray-200 w-full'></div>
          <Link href='/events'><span className='block font-bold'>Events</span></Link>
          <div className='border-[1px] border-gray-200 w-full'></div>
          {
            userInfo.information ?
            <>
              <Link href='/events/joined'><span className='block font-bold'>Joined Events</span></Link>
              <div className='border-[1px] border-gray-200 w-full'></div>
            </>
            : null
          }
        </div>
        {
          userInfo.information ?
          <button
            className='px-3 py-2 hover:bg-[rgba(0,0,0,0.1)] font-bold'
            onClick={() => {
              logoutUser();
              setIsMenuOpen(false);
              router.replace('/');
            }}
          >
            Logout
          </button> : null
        }
        
      </div>
      <div className={`fixed top-[64px] min-w-[150px] right-0 bg-white drop-shadow rounded-bl-xl z-40 flex flex-col ${isMenuOpen ? 'hidden lg:block' : 'hidden'}`}>
        <button className='w-full px-3 py-2 hover:bg-[rgba(0,0,0,0.1)]'>Edit Profile</button>
        <div className='border-[1px] border-gray-200'></div>
        <button
          className='w-full px-3 py-2 hover:bg-[rgba(0,0,0,0.1)] rounded-bl-xl'
          onClick={() => {
            logoutUser();
            setIsMenuOpen(false);
            router.replace('/');
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};
