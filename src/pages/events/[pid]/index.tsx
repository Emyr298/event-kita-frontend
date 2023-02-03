import Head from 'next/head'
import { EventsModule } from '@/components/modules/EventsModule'
import { NavBar } from '@/components/elements/NavBar'
import { GetServerSidePropsContext } from 'next';
import { generalGSSP, loggedInGSSP } from '@/common/utils/server/gsspShortcuts';
import { UserInformation } from '@/common/utils/server/auth';
import { CreateEventModule } from '@/components/modules/CreateEventModule';
import { useRouter } from 'next/router';
import { EventDetailsModule } from '@/components/modules/EventDetailsModule';
import { fetchEventById } from '@/common/utils/server/events';
import { Event } from '@/common/models/event';

interface EventDetailsPageProps {
  userInfo: UserInformation,
  extra: { event: Event },
};

export default function EventDetailsPage({ userInfo, extra }: EventDetailsPageProps) {
  
  
  return (
    <>
      <Head>
        <title>Event Details - EventKita</title>
      </Head>
      <NavBar userInfo={userInfo} />
      <div className='h-[64px]'></div>
      <EventDetailsModule
        userInfo={userInfo}
        event={extra.event}
      />
    </>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const req = context.req;
  const { pid } = context.query;
  
  let cookieString = req.headers.cookie;
  if (!cookieString) cookieString = '';
  
  if (typeof pid === 'string') {
    const result =  await generalGSSP(context);
    const event = await fetchEventById(pid, cookieString);
    if (result.props && event) {
      result.props.extra = {
        event: event,
      };
      return result;
    }
  }
  
  return {
    notFound: true,
  };
};
