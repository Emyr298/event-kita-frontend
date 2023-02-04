import React, { useState, useEffect } from 'react';
import { Button } from '@/components/elements'
import Link from 'next/link';
import { EventBox } from '@/components/elements/EventBox';
import { fetchAllEvents, FetchAllEvents } from '@/common/utils/client/events';
import { Event } from '@/common/models/event';
import { formatDate } from '@/common/utils/client/format';
import { UserInformation } from '@/common/utils/server/auth';

const emptyCategoryValue = 'Choose Category';

export interface EventsModuleProps {
  userInfo: UserInformation,
};

export const EventsModule : React.FC<EventsModuleProps> = ({userInfo}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(emptyCategoryValue);
  const [orderBy, setOrderBy] = useState('byParticipants');
  const [isMyEvent, setIsMyEvent] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  
  useEffect(() => {
    refetchEvents(name, category, orderBy, isMyEvent);
  } , [name, category, orderBy, isMyEvent]);
  
  async function refetchEvents(name: string, category: string, orderBy: string, isMyEvent: boolean) {
    const curDate = new Date();
    curDate.setHours(0, 0, 0, 0);
    const queryParams: FetchAllEvents = {
      orderBy: orderBy,
    };
    if (name !== '') queryParams.name = name;
    if (category !== emptyCategoryValue) queryParams.category = category;
    if (isMyEvent !== false && userInfo.information) queryParams.userId = userInfo.information.id;
    const events = await fetchAllEvents(queryParams);
    setEvents(events);
  }
  
  return (
    <div>
      <div className='p-6'>
        <form>
          <div className='h-[60px] p-[0.3rem] bg-white drop-shadow border-[1px] border-gray-200 rounded-xl flex flex-row items-stretch outline-none gap-2'>
            <input
              type='text'
              placeholder='Search...'
              className='w-[50%] p-2 border-gray-200 border-2 rounded-xl outline-none'
              onChange={(event) => setName(event.target.value)}
            />
            <select
              className='w-[25%] p-2 border-gray-200 border-2 rounded-xl outline-none'
              onChange={(event) => setCategory(event.target.value)}
            >
              <option className='text-gray-400'>Choose Category</option>
              <option className='text-black' value='attractions'>Attractions</option>
              <option className='text-black' value='music'>Music</option>
              <option className='text-black' value='artsAndCulture'>Arts and Culture</option>
              <option className='text-black' value='education'>Education</option>
            </select>
            <select
              className='w-[25%] p-2 border-gray-200 border-2 rounded-xl outline-none'
              onChange={(event) => setOrderBy(event.target.value)}
            >
              <option value='byParticipants'>Popular</option>
              <option value='byStartTime'>Starting</option>
            </select>
            {
              userInfo.information ?
              <select
                className='w-[25%] p-2 border-gray-200 border-2 rounded-xl outline-none'
                onChange={(event) => setIsMyEvent(event.target.value === 'allEvents' ? false : true)}
              >
                <option value='allEvents'>All Events</option>
                <option value='myEvents'>My Events</option>
              </select> : null
            }
          </div>
        </form>
      </div>
      <div className='px-6 flex flex-row flex-wrap gap-4'>
        {
          events.map((event, i) => (
            <EventBox
              name={event.name}
              date={`${formatDate(new Date(event.start_time))} - ${formatDate(new Date(event.end_time))}`}
              location={event.location}
              participants={event.participants}
              imageUrl={event.image_url}
              clickUrl={`/events/${event.id}`}
              key={i}
            />
          ))
        }
      </div>
      {
        userInfo.status.includes('profile set') ?
        <div className='fixed bottom-0 right-0 m-4'>
          <Link href='/events/create'>
            <Button
              text='Create Event'
              className='font-bold'
            />
          </Link>
        </div> : null
      }
    </div>
  );
};
