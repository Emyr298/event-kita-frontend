import React, { useState } from 'react';
import { Button } from '@/components/elements'
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { isValidImageUrl } from '@/common/utils/client/validation';
import Image from 'next/image';
import { setUserProfile } from '@/common/utils/client/auth';

interface Inputs {
  firstName: string,
  lastName: string,
  photoUrl: string,
}

export interface SetProfileModuleProps {};

export const SetProfileModule : React.FC<SetProfileModuleProps> = ({}) => {
  const router = useRouter();
  
  const [imageUrl, setImageUrl] = useState('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  
  const validateImageUrlValid = (value: string) => {
    return isValidImageUrl(value);
  };
  
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const success = await setUserProfile(
      data.firstName,
      data.lastName,
      data.photoUrl
    );
    
    if (success) {
      router.replace('/');
    } else {
      console.log('Cannot post to server');
      // Error Message
    }
  }
  
  return (
    <>
      <div className='w-full h-screen flex flex-row justify-evenly'>
        <div className='w-full lg:w-[50%] flex justify-center items-center'>
          <div className='m-4 w-[400px] flex flex-col gap-4 items-center'>
            <h1 className='text-center text-3xl'>Set up your <span className='font-bold'>Profile</span></h1>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-2 items-center'>
              <div className='w-[100px] h-[100px] rounded-full overflow-hidden'>
                <Image
                  src={imageUrl}
                  alt='Profile Picture'
                  className='w-[100px] h-[100px] object-cover'
                  width='100'
                  height='100'
                  unoptimized
                  priority
                />
              </div>
              <div className='w-full flex flex-row justify-between gap-2'>
                <div className='w-full'>
                  <input
                    type='text'
                    className='w-full p-2 border-2 border-gray-300 rounded-lg outline-none'
                    placeholder='First Name'
                    {...register('firstName',
                      {
                        required: 'First name is required',
                        maxLength: {
                          value: 70,
                          message: 'Cannot exceed 70 characters'
                        }
                      })
                    }
                  />
                  {
                    errors.firstName ?
                    <span className='block text-sm text-red-500'>{errors.firstName.message}</span> : null
                  }
                </div>
                <div className='w-full'>
                  <input
                    type='text'
                    className='w-full p-2 border-2 border-gray-300 rounded-lg outline-none'
                    placeholder='Last Name'
                    {...register('lastName',
                      {
                        required: 'Last name is required',
                        maxLength: {
                          value: 70,
                          message: 'Cannot exceed 70 characters',
                        }
                      })
                    }
                  />
                  {
                    errors.lastName ?
                    <span className='block text-sm text-red-500'>{errors.lastName.message}</span> : null
                  }
                </div>
              </div>
              <div className='w-full'>
                <input
                  type='url'
                  className='w-full p-2 border-2 border-gray-300 rounded-lg outline-none'
                  placeholder='Profile Picture URL'
                  {...register('photoUrl',
                    {
                      required: 'Profile picture URL is required',
                      maxLength: {
                        value: 2048,
                        message: 'Cannot exceed 2048 characters',
                      },
                      validate: {
                        checkImageUrl: (value) => isValidImageUrl(value) || 'Image URL is not valid',
                      },
                      onChange: (event) => {
                        if (isValidImageUrl(event.target.value)) {
                          setImageUrl(event.target.value);
                        }
                      },
                    })
                  }
                />
                {
                  errors.photoUrl ?
                  <span className='block text-sm text-red-500'>{errors.photoUrl?.message}</span> : null
                }
              </div>
              <Button
                text='Complete'
                className='w-full text-white font-bold'
              />
            </form>
          </div>
        </div>
        <div className='w-[50%] bg-gray-200 hidden lg:block'></div>
      </div>
    </>
  );
};
