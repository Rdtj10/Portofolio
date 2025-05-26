import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/context/themeContext";
import { TrpcProvider } from "./api/provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ridho Dimas - JavaScript Developer",
  description: "Selamat datang di situs resmi Ridho Dimas - Fullstack Developer dengan keahlian di React, TypeScript, dan tRPC.",
  keywords: ["Ridho Dimas", "Portofolio", "Fullstack Developer", "React", "tRPC"],
  authors: [{ name: "Ridho Dimas", url: "https://ridhodimas.xyz" }],
  creator: "Ridho Dimas",
  metadataBase: new URL("https://ridhodimas.xyz"),
  openGraph: {
    title: "Ridho Dimas - Portofolio Developer",
    description: "Jelajahi proyek dan karya Ridho Dimas sebagai Fullstack Developer.",
    url: "https://ridhodimas.xyz",
    siteName: "Ridho Dimas",
    type: "website",
    images: [
      {
        url: "/logo/rdtj.png",
        width: 800,
        height: 600,
        alt: "Logo Ridho Dimas",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Ridho Dimas - Developer Portofolio",
    description: "Website resmi Ridho Dimas. Lihat proyek, kontak, dan pengalaman kerja.",
    images: ["/logo/rdtj.png"],
    creator: "@s_letoy", 
  },

  icons: {
    icon: "/logo/rdtj.png",
    apple: "/logo/rdtj.png",
    shortcut: "/logo/rdtj.png",
  },

  manifest: "/site.webmanifest",
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
