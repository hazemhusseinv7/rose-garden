import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";

import { getAboutUsData, getSettingsData } from "@/lib/sanity/queries";

export default async function Home() {
  const settings: SettingsType | null = await getSettingsData();
  const aboutUs: AboutUsType | null = await getAboutUsData();

  return (
    <main>
      <Hero />
      <AboutUs settings={settings} aboutUs={aboutUs} />
    </main>
  );
}
