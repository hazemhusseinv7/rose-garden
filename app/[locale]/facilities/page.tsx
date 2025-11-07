import Facilities from "@/components/Facilities";

import { getFacilitiesData } from "@/lib/sanity/queries";

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  const facilities: FacilitiesType | null = await getFacilitiesData(locale);

  return (
    <main>
      <Facilities facilities={facilities} className="pt-32 sm:pt-40" />
    </main>
  );
}
