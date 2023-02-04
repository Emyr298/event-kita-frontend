import React, { useState } from 'react';
import Image from 'next/image';
import { Event } from '@/common/models/event';
import { formatDate } from '@/common/utils/client/format';
import { UserInformation } from '@/common/utils/server/auth';
import { Button } from '@/components/elements';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { deleteEvent, deleteJoinEvent, postJoinEvent } from '@/common/utils/client/events';

export interface EventDetailsModuleProps {
  userInfo: UserInformation,
  event: Event,
};

export const EventDetailsModule : React.FC<EventDetailsModuleProps> = ({ userInfo, event }) => {
  const router = useRouter();
  
  const deleteEventOnClick = async function() {
    const deleteEventResult = await deleteEvent(event.id);
    if (deleteEventResult) {
      router.replace('/events');
    }
  }
  
  function convertCategory(category: string) {
    if (category == 'artsAndCulture') return 'Arts and Culture'
    if (category == 'music') return 'Music'
    if (category == 'education') return 'Education'
    if (category == 'attractions') return 'Attractions'
  }
  
  async function joinEvent() {
    const status = await postJoinEvent(event.id);
    if (status) {
      router.reload();
    }
  }
  
  async function leaveEvent() {
    const status = await deleteJoinEvent(event.id);
    if (status) {
      router.reload();
    }
  }
  
  return (
    <div className='w-full flex flex-row justify-center lg:my-10'>
      <div className='w-full lg:w-[500px] p-4 bg-white lg:drop-shadow lg:border-[1px] lg:border-gray-200 lg:rounded-xl flex flex-col gap-4'>
        <h1 className='font-bold text-2xl text-center'>{event.name}</h1>
        <div className='w-full flex flex-col gap-2 items-center'>
          <div className='w-full h-[200px] rounded-xl overflow-hidden'>
            <Image
              src={event.image_url}
              alt='Profile Picture'
              className='w-full h-full object-cover'
              width='100'
              height='100'
              unoptimized
              priority
            />
          </div>
          <div className='w-full flex flex-row justify-between'>
            <div>
              <span className='block'><span className='font-bold'>Category: </span>{convertCategory(event.category)}</span>
              <span className='block'><span className='font-bold'>Schedule: </span>{`${formatDate(new Date(event.start_time))} - ${formatDate(new Date(event.end_time))}`}</span>
              <span className='block'><span className='font-bold'>Location: </span>{event.location}</span>
              <span className='block'><span className='font-bold'>Participants: </span>{event.participants}</span>
            </div>
            {
              userInfo.information && userInfo.information.id === event.user.id ?
              <div>
                <Link href={`/events/${event.id}/edit`}>
                  <Button
                    text='Edit'
                    className='mr-2'
                  />
                </Link>
                <Button
                  text='Delete'
                  onPressed={() => { deleteEventOnClick() }}
                />
              </div> : null
            }
          </div>
          <div className='w-full'>
            <p>{event.description ? event.description : <span className='text-gray-500'>No Description</span>}</p>
          </div>
          {
            userInfo.information ?
            (
              event.participated_users.some((iterUser) => {
                return iterUser.id === userInfo.information?.id;
              }) ?
              <Button
                text='Leave the Event'
                className='w-full'
                onPressed={() => { leaveEvent() }}
              /> :
              <Button
                text='Join the Event'
                className='w-full'
                onPressed={() => { joinEvent() }}
              />
            )
            : null
          }
        </div>
      </div>
    </div>
  );
};
