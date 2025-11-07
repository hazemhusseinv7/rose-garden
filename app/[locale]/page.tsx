import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Facilities from "@/components/Facilities";
import Testimonials from "@/components/Testimonials";
// import Contact from "@/components/ContactUs/Contact";

import {
  getSettingsData,
  getAboutUsData,
  getFacilitiesData,
  getTestimonialsData,
} from "@/lib/sanity/queries";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale as Locale);

  const [settings, aboutUs, facilities, testimonials] = await Promise.all([
    getSettingsData(),
    getAboutUsData(),
    getFacilitiesData(locale),
    getTestimonialsData(locale),
  ]);

  return (
    <main>
      <Hero params={params} />
      <AboutUs settings={settings} aboutUs={aboutUs} />
      <Facilities facilities={facilities} />
      <Testimonials testimonials={testimonials} />
      {/* <Contact /> */}
    </main>
  );
}
