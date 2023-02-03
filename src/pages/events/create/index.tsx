import Head from 'next/head'
import { EventsModule } from '@/components/modules/EventsModule'
import { NavBar } from '@/components/elements/NavBar'
import { GetServerSidePropsContext } from 'next';
import { generalGSSP, loggedInGSSP } from '@/common/utils/server/gsspShortcuts';
import { UserInformation } from '@/common/utils/server/auth';
import { CreateEventModule } from '@/components/modules/CreateEventModule';

interface CreateEventPageProps {
  userInfo: UserInformation,
};

export default function CreateEventPage({ userInfo }: CreateEventPageProps) {
  return (
    <>
      <Head>
        <title>Create Event - EventKita</title>
      </Head>
      <NavBar userInfo={userInfo} />
      <div className='h-[64px]'></div>
      <CreateEventModule/>
    </>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return await loggedInGSSP(context);
};
