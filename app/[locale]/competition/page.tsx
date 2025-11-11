import { getSettingsData } from "@/lib/sanity/queries";

import CompetitionComponent from "./CompetitionComponent";

export default async function Page() {
  const settings: SettingsType | null = await getSettingsData();

  return (
    <main className="min-h-screen py-40">
      {settings?.enableCompetition && (
        <CompetitionComponent settings={settings} />
      )}
    </main>
  );
}
