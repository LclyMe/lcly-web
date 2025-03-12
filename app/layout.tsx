import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";
import Analytics from "@/components/analytics";
import { AppLayout } from "@/components/app-layout";

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
    default: "Lcly",
    template: "%s | Lcly",
  },
  description:
    "Your UK Postcode Online. Find your community, meet neighbours, and improve your local area. Or help up build app that real communities can actually use.",
  keywords: [
    "postcode",
    "community",
    "neighbours",
    "local",
    "uk",
    "uk postcode",
    "uk community",
    "uk neighbours",
    "uk local",
    "nextdoor",
    "nextdoor uk",
    "nextdoor neighbours",
    "nextdoor local",
    "open source nextdoor",
    "lcly",
    "lcly uk",
    "lcly uk postcode",
    "lcly uk community",
    "lcly uk neighbours",
    "lcly uk local",
    "lcly uk postcode",
    "lcly uk community",
    "lcly uk neighbours",
    "lcly uk local",
    "local social media",
    "local community",
    "local neighbourhood",
  ],
  alternates: {
    canonical: "https://lcly.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-[100dvh] bg-white dark:bg-background transition-colors duration-200`}
      >
        <Providers>
          <AppLayout>{children}</AppLayout>
          <Analytics />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
