import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Facilities from "@/components/Facilities";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/ContactUs/Contact";

import {
  getSettingsData,
  getAboutUsData,
  getFacilitiesData,
  getTestimonialsData,
} from "@/lib/sanity/queries";

export default async function Home() {
  const settings: SettingsType | null = await getSettingsData();
  const aboutUs: AboutUsType | null = await getAboutUsData();
  const facilities: FacilitiesType | null = await getFacilitiesData();
  const testimonials: TestimonialsType | null = await getTestimonialsData();

  return (
    <main>
      <Hero />
      <AboutUs settings={settings} aboutUs={aboutUs} />
      <Facilities facilities={facilities} />
      <Testimonials testimonials={testimonials} />
      <Contact />
    </main>
  );
}
