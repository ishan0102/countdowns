import Head from 'next/head';
import Script from 'next/script'
import { Countdown } from '../components/Countdown'

export default function home() {
  return (
    <>
      <Countdown/>
      <Head>
        <title>countdowns</title>
        <link rel="icon" href="/static/favicon.png" />

      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script 
        strategy="afterInteractive" 
        src={"https://www.googletagmanager.com/gtag/js?id=G-KJ2KXYRCND"}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KJ2KXYRCND', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
