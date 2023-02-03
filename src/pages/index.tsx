import Head from 'next/head'
import { Inter } from '@next/font/google'
import { NavBar } from '@/components/elements/NavBar'
import { GetServerSidePropsContext } from 'next'
import { generalGSSP } from '@/common/utils/server/gsspShortcuts'
import { UserInformation } from '@/common/utils/server/auth'

const inter = Inter({ subsets: ['latin'] })

interface HomePageProps {
  userInfo: UserInformation,
};

export default function HomePage({ userInfo }: HomePageProps) {
  return (
    <>
      <Head>
        <title>EventKita</title>
      </Head>
      <NavBar userInfo={userInfo} />
      <div className='h-[64px]'></div>
      <h1>Landing Page</h1>
    </>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return await generalGSSP(context);
};
