import { ReactQueryClientWrapper } from "@/utils/QueryClient";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OAU WGTBAM",
  description: "Obafemi Awolowo University, Who Gets To Be A Millionaire",
  icons: {
    icon: "/Images/logo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryClientWrapper>
          <ToastContainer />
          {children}
        </ReactQueryClientWrapper>
      </body>
    </html>
  );
}