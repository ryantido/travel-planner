import type { Metadata } from "next";
import { Roboto_Mono, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Velora",
  description: "Plan, document, and share your journeys effortlessly with Velora – a beautifully designed travel app.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${robotoMono.variable} ${geistMono.variable} antialiased font-mono`}
      >
        <NavBar session={session}/>      
        {children}
        <Toaster position="bottom-right" closeButton richColors/>
      </body>
    </html>
  );
}
