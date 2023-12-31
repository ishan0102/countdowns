import "@/styles/globals.css";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "countdowns",
  description: "Make beautiful countdowns and share them with your friends!",
  metadataBase: new URL("https://countdowns.live"),
  icons: ["/favicon.png"],
  openGraph: {
    type: "website",
    url: "https://www.countdowns.live",
    siteName: "countdowns",
    images: [
      {
        url: "https://www.countdowns.live/static/thumbnail.png",
        alt: "countdowns.live homepage",
      },
    ],
  },
  twitter: {
    creator: "@ishan0102",
    site: "@ishan0102",
    card: "summary_large_image",
  },
};

{/* Global Site Tag (gtag.js) - Google Analytics */ }
function GoogleAnalytics() {
  return <>
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
      <GoogleAnalytics />
    </html>
  );
}
