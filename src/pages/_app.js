import '../styles/globals.css'
import { DefaultSeo } from 'next-seo'

export default function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: 'website',
          url: 'https://www.countdowns.live',
          title: 'countdowns',
          description: 'Make countdowns and share them with your friends.',
          images: [
            {
              url: '/static/thumbnail.png',
              width: 3456,
              height: 1922,
              alt: 'countdowns.live homepage',
            },
          ],
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
