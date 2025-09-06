import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/UI/common/header";
import Footer from "@/UI/common/footer";
import { Toaster } from "@/Components/ui/sonner";

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
            <Toaster richColors position="top-center"/>
            <Analytics />
            <SpeedInsights />
          </ClerkProvider>
        </body>
      </html>
    </>
  );
}
