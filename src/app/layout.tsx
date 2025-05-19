import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/context/themeContext";
import { TrpcProvider } from "./apis/provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ridho Dimas",
  description: "Welcome to my site!",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Ridho Dimas",
    description: "Welcome to my site!",
    images: [
      {
        url: "/logo/rdtj.png",
        width: 800,
        height: 600,
        alt: "Kawan Study",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <ToastContainer />
          <TrpcProvider>
            {children}
          </TrpcProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
