import "@/styles/globals.css";
import { Metadata } from "next";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
