import Head from 'next/head'
import { NavBar } from '@/components/elements/NavBar'
import { GetServerSidePropsContext } from 'next';
import { generalGSSP } from '@/common/utils/server/gsspShortcuts';
import { UserInformation } from '@/common/utils/server/auth';
import { fetchEventById } from '@/common/utils/server/events';
import { Event } from '@/common/models/event';
import { EditEventModule } from '@/components/modules/EditEventModule';

interface EditEventPageProps {
  userInfo: UserInformation,
  extra: { event: Event },
};

export default function EditEventPage({ userInfo, extra }: EditEventPageProps) {
  return (
    <>
      <Head>
        <title>Edit Event - EventKita</title>
      </Head>
      <NavBar userInfo={userInfo} />
      <div className='h-[64px]'></div>
      <EditEventModule
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
    if (result.props && result.props.userInfo.information && event && event.user.id === result.props.userInfo.information.id) {
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
