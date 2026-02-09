import type { Metadata } from "next";
import { Quicksand, Poppins } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Will you be my Valentine? 💕",
  description: "A sweet Valentine's Day surprise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${quicksand.variable} ${poppins.variable}`}>
      <body className="font-quicksand antialiased bg-valentine-cream min-h-screen">
        {children}
      </body>
    </html>
  );
}
