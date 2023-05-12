import { useRouter } from 'next/router'
import Head from 'next/head';
import Script from 'next/script'
import { Countdown } from '../components/Countdown'

export default function home() {
  const router = useRouter();

  if (typeof window === 'undefined') {
    return null;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const date = urlParams.get('date') || localStorage.getItem('date') || '';
  const time = urlParams.get('time') || localStorage.getItem('time') || '';
  const desc = urlParams.get('desc') || localStorage.getItem('desc') || '';
  const timezone = urlParams.get('timezone') || localStorage.getItem('timezone') || '';
  const countdownStyle = urlParams.get('style') || localStorage.getItem('countdownStyle') || '';
  const background = urlParams.get('bg') || localStorage.getItem('background') || '';

  // Update URL without reloading the page
  history.replaceState(null, null, `?date=${date}&time=${time}&desc=${desc}&timezone=${timezone}&style=${countdownStyle}&bg=${background}`);

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
