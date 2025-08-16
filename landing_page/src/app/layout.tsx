import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/Components/UI/common/header";
import Footer from "@/Components/UI/common/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DriveLite landing page",
  description: "Landing page to DriveLite",
  icons: {
    icon: "/favicon.ico",
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
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          >
            <Header />
            <main className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
              {children}
            </main>
            <Footer />
            <Toaster position="top-center" richColors />
            <Analytics />
            <SpeedInsights />
          </ClerkProvider>
        </body>
      </html>
    </>
  );
}
