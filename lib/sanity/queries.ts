import { sanityClient } from "@/lib/sanity/client";

export async function getSettingsData(): Promise<SettingsType | null> {
  const query = `*[_type == "settings"][0]{
    twitter,
    tiktok,
    instagram,
    whatsapp
  }`;

  try {
    return await sanityClient.fetch(
      query,
      {},
      {
        next: { revalidate: 3600, tags: ["settings", "content"] },
      }
    );
  } catch (error) {
    console.error("Error fetching settings data:", error);
    return null;
  }
}

export async function getHeaderData(): Promise<HeaderType | null> {
  const query = `*[_type == "header"][0]{
    navigationItems[] {
      title,
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        }
      },
      links[] {
        name,
        href
      }
    }
  }`;

  try {
    return await sanityClient.fetch(
      query,
      {},
      {
        next: { revalidate: 0, tags: ["header"] },
      }
    );
  } catch (error) {
    console.error("Error fetching header data:", error);
    return null;
  }
}

export async function getHeroData(): Promise<HeroType | null> {
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

export async function getAboutUsData(): Promise<AboutUsType | null> {
  const query = `*[_type == "aboutUs"][0]{
    image {
      asset-> {
        _id,
        url,
        metadata {
          dimensions
        }
      }
    },
  }`;

  try {
    return await sanityClient.fetch(
      query,
      {},
      {
        next: { revalidate: 3600, tags: ["aboutUs"] },
      }
    );
  } catch (error) {
    console.error("Error fetching about us data:", error);
    return null;
  }
}

export async function getTestimonialsData(): Promise<TestimonialsType | null> {
  const query = `*[_type == "testimonials"][0]{
    testimonials[] {
      name,
      content
    }
  }`;

  try {
    return await sanityClient.fetch(
      query,
      {},
      {
        next: { revalidate: 3600, tags: ["testimonials"] },
      }
    );
  } catch (error) {
    console.error("Error fetching testimonials data:", error);
    return null;
  }
}
