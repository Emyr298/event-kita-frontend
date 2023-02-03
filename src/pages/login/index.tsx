import Head from 'next/head'
import { LoginModule } from '@/components'
import { GetServerSidePropsContext } from 'next';
import { nonLoggedInOnly } from '@/common/utils/server/gsspShortcuts';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login - EventKita</title>
      </Head>
      <LoginModule/>
    </>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return await nonLoggedInOnly(context);
};
