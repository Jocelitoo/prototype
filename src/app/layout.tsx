import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Header } from "@/components/Header";
import { CartContextProvider } from "@/hooks/CartContextProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "D085 Suplementos",
  description: "Loja de suplementos e produtos de acadêmia em geral",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased space-y-4`}
      >
        <CartContextProvider>
          <Header />

          <main>{children}</main>
        </CartContextProvider>
      </body>
    </html>
  );
}
