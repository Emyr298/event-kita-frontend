import Head from 'next/head'
import { LoginModule } from '@/components'

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
