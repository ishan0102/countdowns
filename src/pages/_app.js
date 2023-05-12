import '../styles/globals.css'
import { DefaultSeo } from 'next-seo'

const defaultSEO = {
  title: 'countdowns',
  description:
    'Make beautiful countdowns and share them with your friends!',
  openGraph: {
    type: 'website',
    url: 'https://www.countdowns.live',
    site_name: 'countdowns',
    images: [
      {
        url: '/static/thumbnail.png',
        alt: 'countdowns.live homepage',
      },
    ],
  },
  twitter: {
    handle: '@ishan0102',
    site: '@ishan0102',
    cardType: 'summary_large_image',
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...defaultSEO} />
      <Component {...pageProps} />
    </>
  );
}
