import React, { useState } from 'react';
import { Button } from '@/components/elements'
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import { isValidImageUrl } from '@/common/utils/client/validation';
import { postEvent } from '@/common/utils/client/events';

interface Inputs {
  name: string,
  category: string,
  description: string,
  location: string,
  startTime: string,
  endTime: string,
  userId: string,
  imageUrl: string,
}

const emptyCategoryValue = 'Choose Category';

export interface CreateEventModuleProps {};

export const CreateEventModule : React.FC<CreateEventModuleProps> = ({}) => {
  const router = useRouter();
  
  const [imageUrl, setImageUrl] = useState('');
  const [startTime, setStartTime] = useState<Date>();
  const [category, setCategory] = useState(emptyCategoryValue);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  
  const checkValidImageUrl = (value: string) => {
    return isValidImageUrl(value);
  };
  
  const checkValidEndTime = (value: string) => {
    const endTime = new Date(value);
    if (!startTime) return true;
    return startTime.getTime() <= endTime.getTime();
  };
  
  const checkValidCategory = (value: string) => {
    return value !== emptyCategoryValue;
  };
  
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const success = await postEvent({
      name: data.name,
      category: data.category,
      description: data.description,
      location: data.location,
      startTime: new Date(data.startTime).toISOString(),
      endTime: new Date(data.endTime).toISOString(),
      imageUrl: data.imageUrl,
    });
    
    if (success) {
      router.replace('/events');
    } else {
      console.log('Cannot post to server');
    }
  }
  
  return (
    <div className='w-full lg:h-[calc(100vh-64px)] lg:flex lg:items-center lg:justify-center'>
      <div className='lg:w-[1000px] p-4 bg-white lg:drop-shadow lg:border-[1px] lg:border-gray-200 lg:rounded-xl'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-4 items-center'>
          <h1 className='font-bold text-2xl'>Create Event</h1>
          <div className='w-full flex flex-col lg:flex-row items-stretch gap-4'>
            <div className='w-full flex flex-col gap-2 items-center'>
              <div className='w-full h-[200px] rounded-xl overflow-hidden'>
                <Image
                  src={imageUrl}
                  alt='Profile Picture'
                  className='w-full h-full object-cover'
                  width='100'
                  height='100'
                  unoptimized
                  priority
                />
              </div>
              <div className='w-full'>
                <input
                  type='text'
                  className='w-full p-2 border-2 border-gray-300 rounded-lg outline-none'
                  placeholder='Name'
                  {...register('name',
                    {
                      required: 'Name is required',
                      maxLength: {
                        value: 70,
                        message: 'Cannot exceed 70 characters'
                      }
                    })
                  }
                />
                {
                  errors.name ?
                  <span className='block text-sm text-red-500'>{errors.name.message}</span> : null
                }
              </div>
              <div className='w-full flex flex-row justify-between gap-2'>
                <div className='w-full'>
                  <select
                    className={`w-full p-2 border-2 border-gray-300 rounded-lg outline-none ${category === emptyCategoryValue ? 'text-gray-400': ''}`}
                    {...register('category',
                      {
                        required: 'Category is required',
                        validate: {
                          checkCategory: (value) => checkValidCategory(value) || 'Category is required',
                        },
                        onChange: (event) => {
                          setCategory(event.target.value);
                        },
                      })
                    }
                  >
                    <option className='text-gray-400'>Choose Category</option>
                    <option className='text-black' value='attractions'>Attractions</option>
                    <option className='text-black' value='music'>Music</option>
                    <option className='text-black' value='artsAndCulture'>Arts and Culture</option>
                    <option className='text-black' value='education'>Education</option>
                  </select>
                  {
                    errors.category ?
                    <span className='block text-sm text-red-500'>{errors.category.message}</span> : null
                  }
                </div>
                <div className='w-full'>
                  <input
                    type='url'
                    className='w-full p-2 border-2 border-gray-300 rounded-lg outline-none'
                    placeholder='Image URL'
                    {...register('imageUrl',
                      {
                        required: 'Image URL is required',
                        validate: {
                          checkImageUrl: (value) => checkValidImageUrl(value) || 'Image URL is not valid',
                        },
                        onChange: (event) => {
                          if (checkValidImageUrl(event.target.value)) {
                            setImageUrl(event.target.value);
                          }
                        },
                      })
                    }
                  />
                  {
                    errors.imageUrl ?
                    <span className='block text-sm text-red-500'>{errors.imageUrl.message}</span> : null
                  }
                </div>
              </div>
              <div className='w-full flex flex-row justify-between gap-2'>
                <div className='w-[45%] lg:w-full'>
                  <input
                    type='date'
                    className='w-full p-2 border-2 border-gray-300 rounded-lg outline-none'
                    placeholder='Start Time'
                    {...register('startTime',
                      {
                        required: 'Start time is required',
                        onChange: (event) => {
                          setStartTime(new Date(event.target.value));
                        },
                      })
                    }
                  />
                  {
                    errors.startTime ?
                    <span className='block text-sm text-red-500'>{errors.startTime.message}</span> : null
                  }
                </div>
                <span className='block text-3xl text-gray-500'>-</span>
                <div className='w-[45%] lg:w-full'>
                  <input
                    type='date'
                    className='w-full p-2 border-2 border-gray-300 rounded-lg outline-none'
                    placeholder='End Time'
                    {...register('endTime',
                      {
                        required: 'End time is required',
                        validate: {
                          checkStartTime: (value) => checkValidEndTime(value) || 'Must be later than start time',
                        },
                      })
                    }
                  />
                  {
                    errors.endTime ?
                    <span className='block text-sm text-red-500'>{errors.endTime.message}</span> : null
                  }
                </div>
              </div>
              <div className='w-full'>
                <input
                  type='text'
                  className='w-full p-2 border-2 border-gray-300 rounded-lg outline-none'
                  placeholder='Location'
                  {...register('location',
                    {
                      required: 'Location is required',
                      maxLength: {
                        value: 1024,
                        message: 'Cannot exceed 1024 characters'
                      }
                    })
                  }
                />
                {
                  errors.location ?
                  <span className='block text-sm text-red-500'>{errors.location.message}</span> : null
                }
              </div>
            </div>
            <div className='border-[1px] border-gray-200 bg-black hidden lg:block'></div>
            <div className='w-full'>
              <div className='w-full h-full'>
                <textarea
                  className='w-full h-full p-2 border-2 border-gray-300 rounded-lg outline-none resize-none'
                  placeholder='Description'
                  {...register('description')}
                >
                </textarea>
              </div>
            </div>
          </div>
          <Button
            text='Create'
            className='w-[200px] text-white font-bold'
          />
        </form>
      </div>
    </div>
  );
};
