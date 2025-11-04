import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Testimonials from "@/components/Testimonials";
import Facilities from "@/components/Facilities";

import {
  getSettingsData,
  getAboutUsData,
  getTestimonialsData,
  getFacilitiesData,
} from "@/lib/sanity/queries";

export default async function Home() {
  const settings: SettingsType | null = await getSettingsData();
  const aboutUs: AboutUsType | null = await getAboutUsData();
  const testimonials: TestimonialsType | null = await getTestimonialsData();
  const facilities: FacilitiesType | null = await getFacilitiesData();

  return (
    <main>
      <Hero />
      <AboutUs settings={settings} aboutUs={aboutUs} />
      <Testimonials testimonials={testimonials} />
      <Facilities facilities={facilities} />
    </main>
  );
}
