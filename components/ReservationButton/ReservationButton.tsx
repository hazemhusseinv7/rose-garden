import ReservationButtonComponent from "@/components/ReservationButton/ReservationButtonComponent";

import { getSettingsData } from "@/lib/sanity/queries";

const ReservationButton = async () => {
  const settings: SettingsType | null = await getSettingsData();

  if (!settings?.whatsapp) return null;

  return <ReservationButtonComponent whatsapp={settings?.whatsapp} />;
};

export default ReservationButton;
