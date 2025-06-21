import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

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
  title: "Creovate - Your Ultimate Creative Content Assistant",
  description:
    "Creovate - Your go-to platform for creative content creation, idea generation, and project management. Join our community today!",
  keywords:
    "content creation, idea generation, creative tools, project management, creators",
  openGraph: {
    title: "Creovate - Your Ultimate Creative Content Assistant",
    description:
      "Creovate - Your go-to platform for creative content creation and idea generation",
    type: "website",
    locale: "en_US",
    url: "https://creovate.com",
    siteName: "Creovate",
    images: [
      {
        url: "https://creovate.com/og-image.png",
        width: 1280,
        height: 720,
        alt: "Creovate - Your Ultimate Creative Content Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creovate - Your Ultimate Creative Content Assistant",
    description:
      "Creovate - Your go-to platform for creative content creation",
    creator: "@creovate",
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
    <ClerkProvider>
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
    </ClerkProvider>
  );
}
