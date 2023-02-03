import Head from 'next/head'
import { EventsModule } from '@/components/modules/EventsModule'
import { NavBar } from '@/components/elements/NavBar'
import { GetServerSidePropsContext } from 'next';
import { generalGSSP } from '@/common/utils/server/gsspShortcuts';
import { UserInformation } from '@/common/utils/server/auth';

interface EventsPageProps {
  userInfo: UserInformation,
};

export default function EventsPage({ userInfo }: EventsPageProps) {
  return (
    <>
      <Head>
        <title>Events - EventKita</title>
      </Head>
      <NavBar userInfo={userInfo} />
      <div className='h-[64px]'></div>
      <EventsModule
        userInfo={userInfo}
      />
    </>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return await generalGSSP(context);
};
