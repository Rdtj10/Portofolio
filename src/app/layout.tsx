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
  title: "Ridho Dimas - Young Dev",
  description: "Welcome to my site!",
  keywords: [
    "Ridho Dimas",
    "Portofolio",
    "Fullstack Developer",
    "React",
    "tRPC",
  ],
  authors: [{ name: "Ridho Dimas", url: "https://ridhodimas.xyz" }],
  creator: "Ridho Dimas",
  metadataBase: new URL("https://ridhodimas.xyz"),
  openGraph: {
    title: "Ridho Dimas - Personal Web",
    description: "Explore all about me!",
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
    title: "Ridho Dimas - Young Dev",
    description: "My personal web, explore all the projects and all about me",
    images: ["/logo/rdtj.png"],
    creator: "@s_letoy",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
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
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <ToastContainer />
          <TrpcProvider>{children}</TrpcProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
