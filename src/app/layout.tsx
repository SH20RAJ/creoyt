import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../../stack";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Creovate | AI-Powered Content Creation Platform",
    template: "%s | Creovate"
  },
  description: "Transform your content creation with AI. Generate ideas, research trends, create content, and analyze performance all in one powerful platform.",
  keywords: [
    "AI content creation",
    "content marketing",
    "social media content",
    "content strategy",
    "AI writing assistant",
    "content analytics",
    "digital marketing",
    "content planning"
  ],
  authors: [{ name: "Creovate Team" }],
  creator: "Creovate",
  publisher: "Creovate",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://creovate.com',
    title: 'Creovate | AI-Powered Content Creation Platform',
    description: 'Transform your content creation with AI. Generate ideas, research trends, create content, and analyze performance all in one powerful platform.',
    siteName: 'Creovate',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Creovate - AI-Powered Content Creation Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creovate | AI-Powered Content Creation Platform',
    description: 'Transform your content creation with AI. Generate ideas, research trends, create content, and analyze performance all in one powerful platform.',
    images: ['/twitter-image.jpg'],
    creator: '@creovate',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  alternates: {
    canonical: 'https://creovate.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Creovate" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StackProvider app={stackServerApp}>
          <StackTheme>
            {children}
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
