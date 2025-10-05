// DriveLite - The self-hostable file storage solution.
// Copyright (C) 2025
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/_components/common/footer";
import { Navbar } from "@/_components/common/navbar";
import { ThemeProvider } from "@/_components/theme-provider";
import { Toaster } from "@/_components/ui/sonner";

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
    default: "Home | DriveLite",
    template: "%s | DriveLite",
  },
  description:
    "Private. Secure. Yours. An open-source Supabase alternative for file storage.",
  metadataBase: new URL("https://drivelite.org"),
  openGraph: {
    title: "Home | DriveLite",
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
    title: "Home | DriveLite",
    description:
      "Private. Secure. Yours. An open-source Supabase alternative for file storage.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://drivelite.org",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "DriveLite",
              url: "https://drivelite.com",
              logo: "https://drivelite.com/logo.png",
              description: "Secure cloud storage solution",
              sameAs: [
                "https://twitter.com/drivelite",
                "https://linkedin.com/company/drivelite",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen" data-pagefind-body>
            {children}
          </main>
          <Footer />
          <Toaster richColors position="top-center" />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
