import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import DarkReaderProtection from "@/components/DarkReaderProtection";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ErrorBoundary from "@/components/ErrorBoundary";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import Script from "next/script";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: "AryanWeb3 - Ethereum, DeFi & Blockchain Blog",
  description: "Your gateway to understanding Ethereum, DeFi, NFTs, and the decentralized future of the internet. Expert insights on blockchain technology, smart contracts, and Web3 innovation.",
  keywords: ["Web3", "Ethereum", "DeFi", "NFTs", "Blockchain", "Smart Contracts", "Cryptocurrency", "Decentralized Finance", "Layer 2", "DAO", "Staking", "Gaming", "Metaverse", "Tokenization"],
  authors: [{ name: "AryanWeb3 Team" }],
  creator: "AryanWeb3",
  publisher: "AryanWeb3",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.SITE_URL || 'https://aryanweb3.vercel.app'),
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/rss.xml',
      'application/atom+xml': '/atom.xml',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'AryanWeb3',
    title: 'AryanWeb3 - Ethereum, DeFi & Blockchain Blog',
    description: 'Your gateway to understanding Ethereum, DeFi, NFTs, and the decentralized future of the internet.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AryanWeb3 Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@aryanweb3',
    creator: '@aryanweb3',
    title: 'AryanWeb3 - Ethereum, DeFi & Blockchain Blog',
    description: 'Your gateway to understanding Ethereum, DeFi, NFTs, and the decentralized future of the internet.',
    images: ['/og-image.png'],
  },
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AryanWeb3" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${inter.className} transition-colors duration-300`} suppressHydrationWarning>
        <ErrorBoundary>
          <ThemeProvider>
            <DarkReaderProtection />
            <PerformanceMonitor />
            {children}
            <PWAInstallPrompt />
          </ThemeProvider>
        </ErrorBoundary>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
