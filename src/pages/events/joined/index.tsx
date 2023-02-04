import Head from 'next/head';
import { NavBar } from '@/components/elements/NavBar'
import { GetServerSidePropsContext } from 'next';
import { generalGSSP } from '@/common/utils/server/gsspShortcuts';
import { UserInformation } from '@/common/utils/server/auth';
import { JoinedEventsModule } from '@/components/modules/JoinedEventsModule';
import { Event } from '@/common/models/event';
import { fetchJoinedEvents } from '@/common/utils/server/events';

interface EventsPageProps {
  userInfo: UserInformation,
  extra: { events: Event[] },
};

export default function EventsPage({ userInfo, extra }: EventsPageProps) {
  return (
    <>
      <Head>
        <title>Joined Events - EventKita</title>
      </Head>
      <NavBar userInfo={userInfo} />
      <div className='h-[64px]'></div>
      <JoinedEventsModule
        userInfo={userInfo}
        events={extra.events}
      />
    </>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const result =  await generalGSSP(context);
  let reqCookie = context.req.headers.cookie;
  if (!reqCookie) reqCookie = '';
  const events = await fetchJoinedEvents(reqCookie);
  if (result.props && result.props.userInfo.information && events) {
    result.props.extra = {
      events: events,
    };
    return result;
  }
  
  return {
    notFound: true,
  };
};
