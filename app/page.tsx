import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Testimonials from "@/components/Testimonials";

import {
  getSettingsData,
  getAboutUsData,
  getTestimonialsData,
} from "@/lib/sanity/queries";

export default async function Home() {
  const settings: SettingsType | null = await getSettingsData();
  const aboutUs: AboutUsType | null = await getAboutUsData();
  const testimonials: TestimonialsType | null = await getTestimonialsData();

  return (
    <main>
      <Hero />
      <AboutUs settings={settings} aboutUs={aboutUs} />
      <Testimonials testimonials={testimonials} />
    </main>
  );
}
