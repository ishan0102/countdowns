import Head from 'next/head';
import { Countdown } from '../components/Countdown'

export default function home() {
  return (
    <>
      <Countdown/>
      <Head>
        <title>Countdowns</title>
        <link rel="icon" href="/static/favicon.png" />
      </Head>
    </>
  )
}
