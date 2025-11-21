import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CSS → Tailwind v4 转换器",
  description: "将原生 CSS 实时转换为 Tailwind CSS v4 类名的在线工具",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="CSS, Tailwind, 转换器, CSS to Tailwind, Tailwind v4" />
        <meta name="author" content="CSS to Tailwind Converter" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
