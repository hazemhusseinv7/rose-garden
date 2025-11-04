import ContactUsComponent from "@/components//ContactUs/ContactUsComponent";

import { getSettingsData } from "@/lib/sanity/queries";

export default async function Page() {
  const settings: SettingsType | null = await getSettingsData();

  return (
    <main className="pt-40 pb-32">
      <ContactUsComponent settings={settings} />
    </main>
  );
}
