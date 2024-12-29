import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "CreoYT - Your Ultimate YouTube Content Assistant",
  description:
    "CreoYT - Your go-to platform for social media content creation, sharing, and engagement. Join our community today!",
  keywords:
    "social media, content creation, video sharing, community, creators",
  openGraph: {
    title: "CreoYT - Your Ultimate YouTube Content Assistant",
    description:
      "CreoYT - Your go-to platform for social media content creation, sharing, and engagement",
    type: "website",
    locale: "en_US",
    url: "https://creoyt.com",
    siteName: "CreoYT",
    images: [
      {
        url: "https://creoyt.com/og-image.png",
        width: 1280,
        height: 720,
        alt: "CreoYT - Your Ultimate YouTube Content Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CreoYT - Your Ultimate YouTube Content Assistant",
    description:
      "CreoYT - Your go-to platform for social media content creation",
    creator: "@creoyt",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  let html = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-G941ZJM59F');`;
  return (
    <SessionProvider>
      <html lang="en" className="dark" suppressHydrationWarning={true}>
        <head>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1828915420581549"
            crossOrigin="anonymous"
          ></script>

          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-G941ZJM59F"
          ></script>
          <script dangerouslySetInnerHTML={{ __html: html }}></script>
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
