import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OAU WGTBAM",
  description: "Obafemi Awolowo University, Who Gets To Be A Millionaire",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg" sizes="16x16" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
