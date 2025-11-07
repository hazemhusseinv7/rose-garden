import { Noto_Kufi_Arabic, Lora } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/[locale]/providers";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Locale, hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReservationButton from "@/components/ReservationButton/ReservationButton";

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi-arabic",
  subsets: ["latin", "arabic"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: Omit<LayoutProps<"/[locale]">, "children">
) {
  const { locale } = await props.params;

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "Metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction} className="scroll-smooth dark">
      <body
        className={cn(
          notoKufiArabic.variable,
          lora.variable,
          "font-noto-kufi-arabic antialiased relative"
        )}
      >
        <NextIntlClientProvider>
          <Providers>
            <Header />
            {children}
            <Footer />
            <ReservationButton />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
