import Head from 'next/head';
import Script from 'next/script'
import { Countdown } from '../components/Countdown'

export default function home() {
  if (typeof window === 'undefined') {
    return null;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const date = urlParams.get('date') || localStorage.getItem('date') || (new Date(new Date().getFullYear() + 1, 0, 1)).toISOString().split('T')[0];
  const time = urlParams.get('time') || localStorage.getItem('time') || '00:00';
  const desc = urlParams.get('desc') || localStorage.getItem('desc') || new Date().getFullYear() + 1;
  const timezone = urlParams.get('timezone') || localStorage.getItem('timezone') || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const countdownStyle = urlParams.get('style') || localStorage.getItem('countdownStyle') || 'fractional';
  const background = urlParams.get('bg') || localStorage.getItem('background') || 'forest.gif';

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
