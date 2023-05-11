import { useRouter } from 'next/router'
import Head from 'next/head';
import Script from 'next/script'
import { Countdown } from '../components/Countdown'

export default function home() {
  const router = useRouter();

  // Parse the URL to get the configuration parameters.
  const urlParams = new URLSearchParams(router.asPath.split(/\?/)[1]);
  const date = urlParams.get('date');
  const time = urlParams.get('time');
  const desc = urlParams.get('desc');
  const timezone = urlParams.get('timezone');
  const countdownStyle = urlParams.get('style');
  const background = urlParams.get('bg');

  return (
    <>
      <Countdown
        date={date}
        time={time}
        desc={desc}
        timezone={timezone}
        countdownStyle={countdownStyle}
        background={background}
      />

      <Head>
        <title>countdowns</title>
        <link rel="icon" href="/static/favicon.png" />

        {/* Google AdSense */}
        <Script
          id="google-adsense"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3670547524946981"
          crossOrigin="anonymous"
        />

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
      </Head>
    </>
  )
}
