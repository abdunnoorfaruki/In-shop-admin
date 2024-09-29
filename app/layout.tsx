import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import { ModalProvider } from "@/providers/modal-provider";
import ToasterProvider from "@/providers/toast-provider";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IN-SHOP Admin Dashboard",
  description:
    "A comprehensive dashboard to manage your inventory in a much better way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <ModalProvider />
        <ToasterProvider />
        <body className={inter.className}>{children}</body>
      </ClerkProvider>
    </html>
  );
}
