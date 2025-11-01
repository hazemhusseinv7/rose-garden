import type { Metadata } from "next";
import { Noto_Kufi_Arabic, Lora } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi-arabic",
  subsets: ["latin", "arabic"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rose Garden",
  description: "Rose Garden Al-Shafa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body
        className={cn(
          notoKufiArabic.variable,
          lora.variable,
          "font-noto-kufi-arabic antialiased"
        )}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
