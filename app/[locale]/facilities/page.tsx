import Facilities from "@/components/Facilities";

import { getFacilitiesData } from "@/lib/sanity/queries";

export default async function Page() {
  const facilities: FacilitiesType | null = await getFacilitiesData();

  return (
    <main>
      <Facilities facilities={facilities} className="pt-32 sm:pt-40" />
    </main>
  );
}
