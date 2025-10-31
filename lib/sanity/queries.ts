import { sanityClient } from "@/lib/sanity/client";

export async function getMainData(): Promise<HeroType | null> {
  const query = `*[_type == "main"][0]{
    title,
    backgroundVideo {
      asset-> {
        url,
        originalFilename,
        mimeType,
        size
      }
    },
    videoAltText
  }`;

  try {
    return await sanityClient.fetch(
      query,
      {},
      {
        next: { revalidate: 3600, tags: ["hero", "content"] },
      }
    );
  } catch (error) {
    console.error("Error fetching hero data:", error);
    return null;
  }
}
