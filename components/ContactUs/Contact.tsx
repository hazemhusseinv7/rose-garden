import ContactUsComponent from "@/components//ContactUs/ContactUsComponent";

import { getSettingsData } from "@/lib/sanity/queries";

const Contact = async () => {
  const settings: SettingsType | null = await getSettingsData();

  return (
    <section id="contact" className="py-32">
      <ContactUsComponent settings={settings} />
    </section>
  );
};

export default Contact;
