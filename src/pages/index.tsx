import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { TextInputField } from '@/components/elements/TextInputField'
import { Button } from '@/components/elements'
import { styles } from '@/common/constants/styles'

const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {
  return (
    <>
      <Head>
        <title>EventKita</title>
      </Head>
      <h1>Landing Page</h1>
    </>
  )
}
