import React, { useState } from 'react';
import { NotificationBox } from '../NotificationBox';

export interface NotificationsProps {
  notifications: Notification[],
};

export interface Notification {
  text: string,
  time: Date,
}

export const Notifications : React.FC<NotificationsProps> = ({
  notifications
}) => {
  return (
    <div className='flex flex-col gap-2'>
      {
        notifications.map((notif, i) => (
          <div key={i}>
            <NotificationBox
              text={notif.text}
            />
          </div>
        ))
      }
    </div>
  );
};
