import React, { useState, useEffect } from 'react';
import { Button } from '@/components/elements'
import Link from 'next/link';
import { EventBox } from '@/components/elements/EventBox';
import { fetchAllEvents, FetchAllEvents } from '@/common/utils/client/events';
import { Event } from '@/common/models/event';
import { formatDate } from '@/common/utils/client/format';
import { UserInformation } from '@/common/utils/server/auth';

export interface JoinedEventsModuleProps {
  userInfo: UserInformation,
  events: Event[],
};

export const JoinedEventsModule : React.FC<JoinedEventsModuleProps> = ({userInfo, events}) => {
  return (
    <div className='p-6 flex flex-row flex-wrap gap-4 justify-center'>
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
  );
};
