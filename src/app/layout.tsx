import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OAU WGTBAM",
  description: "Obafemi Awolowo University, Who Gets To Be A Millionaire",
  icons: {
    icon: {
      url: "/Images/favicon.png",
      href: "/Images/favicon.png",
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/Images/favicon.png"
          type="image/png"
          sizes="16x16"
        />
        <link
          rel="icon"
          href="/Images/favicon.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/Images/favicon.png"
          type="image/png"
          sizes="96x96"
        />
        <link
          rel="icon"
          href="/Images/favicon.png"
          type="image/png"
          sizes="180x180"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
