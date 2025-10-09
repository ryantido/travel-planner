import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";


const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Velora – Your Elegant Travel Companion",
    template: "%s · Velora",
  },
  description:
    "Plan, document, and share your journeys effortlessly with Velora – a beautifully designed travel app.",
  keywords: [
    "Velora",
    "Travel App",
    "Travel Planner",
    "Travel Journal",
    "Trip Sharing",
    "Itinerary",
  ],
  authors: [{ name: "Ryan Tido" }],
  creator: "Ryan Tido",
  applicationName: "Velora",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Velora",
    title: "Velora – Your Elegant Travel Companion",
    description:
      "Plan, document, and share your journeys effortlessly with Velora – a beautifully designed travel app.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Velora – Travel beautifully",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@velora",
    creator: "@velora",
    title: "Velora – Your Elegant Travel Companion",
    description:
      "Plan, document, and share your journeys effortlessly with Velora.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased font-sans`}
      >
        <NavBar session={session}/>      
        {children}
        <Toaster position="bottom-right" closeButton richColors/>
      </body>
    </html>
  );
}
