import type { Metadata } from "next";
import { Press_Start_2P, Nunito } from "next/font/google";
import Script from "next/script";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageViewTracker from "@/components/PageViewTracker";
import AcquisitionTracker from "@/components/AcquisitionTracker";
import { Suspense } from "react";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  variable: "--font-press-start",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoinQuest Play - Earn FREE Robux by Playing Quizzes!",
  description:
    "Complete fun quizzes, earn coins, and cash out for Robux gift cards! 100+ quizzes on Roblox, Minecraft, Anime, and more.",
  keywords: ["robux", "free robux", "quiz", "roblox", "coins", "gift cards"],
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "CoinQuest Play - Earn FREE Robux by Playing Quizzes!",
    description: "Complete fun quizzes, earn coins, and cash out for Robux gift cards!",
    siteName: "CoinQuest Play",
    images: [{ url: "/logo.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary",
    title: "CoinQuest Play - Earn FREE Robux by Playing Quizzes!",
    description: "Complete fun quizzes, earn coins, and cash out for Robux gift cards!",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const gadsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html
      lang="en"
      className={`${pressStart.variable} ${nunito.variable} h-full`}
    >
      <head>
        {/* Google AdSense H5 Games Ad Placement API */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8356035806330431"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.adsbygoogle = window.adsbygoogle || [];
              window.adBreak = window.adConfig = function(o) { window.adsbygoogle.push(o); };
              window.adConfig({ preloadAdBreaks: 'off', sound: 'off' });
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Analytics + Google Ads */}
        {(gaMeasurementId || gadsId) && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId || gadsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-tags" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                ${gaMeasurementId ? `gtag('config', '${gaMeasurementId}');` : ""}
                ${gadsId ? `gtag('config', '${gadsId}');` : ""}
              `}
            </Script>
          </>
        )}
        {/* Meta Pixel */}
        {metaPixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
            `}
          </Script>
        )}
        <AuthProvider>
          <PageViewTracker />
          <Suspense><AcquisitionTracker /></Suspense>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
