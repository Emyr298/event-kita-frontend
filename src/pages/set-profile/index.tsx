import Head from 'next/head'
import { SetProfileModule } from '@/components/modules/SetProfileModule'
import { GetServerSidePropsContext } from 'next';
import { notProfileSetGSSP } from '@/common/utils/server/gsspShortcuts';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Set Profile - EventKita</title>
      </Head>
      <SetProfileModule/>
    </>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return await notProfileSetGSSP(context);
};
