import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: { default: "ShareSpace | Find rooms and compatible roommates", template: "%s | ShareSpace" },
  description:
    "ShareSpace connects property owners and tenants: browse rooms, match with roommates, book viewings, apply, and pay rent online.",
  openGraph: {
    title: "ShareSpace | Find rooms and compatible roommates",
    description: "Browse rooms, match with roommates, apply and pay rent online.",
    type: "website",
    siteName: "ShareSpace",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}