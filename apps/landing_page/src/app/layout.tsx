import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/UI/common/header";
import Footer from "@/UI/common/footer";
import { Toaster } from "@/Components/ui/sonner";
import Script from "next/script";
import { GAnalytics } from "./analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DriveLite – Open-Source Supabase for File Storage",
  description:
    "Private. Secure. Yours. An open-source Supabase alternative for file storage.",
  metadataBase: new URL("https://drivelite.org"),
  openGraph: {
    title: "DriveLite – Open-Source Supabase for File Storage",
    description:
      "Private. Secure. Yours. An open-source Supabase alternative for file storage.",
    url: "https://drivelite.org",
    siteName: "DriveLite",
    images: ["/og-image.png"],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: "DriveLite – Open-Source Supabase for File Storage",
    description:
      "Private. Secure. Yours. An open-source Supabase alternative for file storage.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://drivelite.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <head>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=G-ET03KCVZW`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ET03KCVZW');
          `}
          </Script>
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <GAnalytics />
          <Header />
          <main className=" mx-auto">{children}</main>
          <Footer />
          <Toaster richColors position="top-center" />
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </>
  );
}
