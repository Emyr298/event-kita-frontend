import React, { useState, useEffect } from 'react';
import { Button, TextInputField, ButtonStyle } from '@/components/elements'
import Link from 'next/link';
import { styles } from '@/common/constants/styles';
import { config } from '@/common/constants/config';
import { Notification, Notifications } from '@/components/elements/Notifications';
import { authenticateGoogle } from '@/common/utils/client/auth';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

export interface LoginModuleProps {};

export const LoginModule : React.FC<LoginModuleProps> = ({}) => {
  const cookies = new Cookies();
  const router = useRouter();
  const [notifications, setNotifications] = useState(new Array<Notification>());
  
  useEffect(() => {
    const interval = setInterval(() => {
      popExpiredNotification();
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const pushNotification = (newNotif: Notification) => {
    setNotifications((prevArr) => {
      const newArr = [...prevArr];
      if (newArr.length === config.maxNotifications) {
        newArr.shift();
      }
      newArr.push(newNotif);
      return newArr;
    });
  }
  
  const popExpiredNotification = () => {
    setNotifications((prevArr) => {
      const newArr = new Array<Notification>();
      for (let i = 0; i < prevArr.length; i++) {
        if (new Date().getTime() - prevArr[i].time.getTime() < config.notificationTime) {
          newArr.push(prevArr[i]);
        }
      }
      return newArr;
    });
  }
  
  const authenticateWithGoogle = async () => {
    const authToken = await authenticateGoogle();
    if (authToken) {
      cookies.remove('token');
      cookies.set('token', authToken);
      router.replace('/');
    } else {
      pushNotification({text: 'Unable to login with Google', time: new Date()});
    }
  }
  
  return (
    <>
      <div className='w-full h-screen flex flex-row justify-evenly'>
        <div className='absolute top-2'>
          <Notifications
            notifications={notifications}
          />
        </div>
        <div className='w-[50%] flex justify-center items-center'>
          <div className='absolute top-2 left-2'>
            <Link href='/' style={{color: styles.linkTextColor}}>Back to Home</Link>
          </div>
          <div className='m-4 w-[300px] flex flex-col gap-4 items-center'>
            <h1 className='text-center text-3xl'>Login to <span className='font-bold'>Event</span>Kita</h1>
            <form className='w-full flex flex-col gap-2'>
              <TextInputField
                text='Email'
                className='w-full block'
                name='email'
                type='email'
              />
              <TextInputField
                text='Password'
                className='w-full block'
                name='password'
                type='password'
              />
              <Button
                text='Login'
                className='w-full text-white font-bold'
              />
            </form>
            <div className='w-full border-[1px] border-gray-200'></div>
            <div className='w-full flex flex-col gap-2 items-center'>
              <Button
                text='Login with Google'
                className='w-full text-white font-bold'
                onPressed={authenticateWithGoogle}
              />
              <span>{`Don't have an account? `}<Link href='/register' style={{color: styles.mainColorDark}}>Register</Link></span>
            </div>
          </div>
        </div>
        <div className='w-[50%] bg-gray-200'></div>
      </div>
    </>
  );
};
