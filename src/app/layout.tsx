import type { Metadata } from "next";
import { Press_Start_2P, Nunito } from "next/font/google";
import Script from "next/script";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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
              const adBreak = adConfig = function(o) { adsbygoogle.push(o); };
              adConfig({ preloadAdBreaks: 'on', sound: 'on' });
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Analytics */}
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
