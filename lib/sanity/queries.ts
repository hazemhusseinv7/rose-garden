import { sanityClient } from "@/lib/sanity/client";

export async function getSettingsData(): Promise<SettingsType | null> {
  const query = `*[_type == "settings"][0]{
    email,
    phone, 
    twitter,
    tiktok,
    instagram,
    snapchat,
    whatsapp
  }`;

  try {
    return await sanityClient.fetch(
      query,
      {},
      {
        next: { revalidate: 0, tags: ["settings", "content"] },
      }
    );
  } catch (error) {
    console.error("Error fetching settings data:", error);
    return null;
  }
}

export async function getHeaderData(
  lang: string = "en"
): Promise<HeaderType | null> {
  const query = `*[_type == "header" && language == $lang][0]{
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
      { lang },
      {
        next: { revalidate: 0, tags: ["header"] },
      }
    );
  } catch (error) {
    console.error("Error fetching header data:", error);
    return null;
  }
}

export async function getHeroData(
  lang: string = "en"
): Promise<HeroType | null> {
  const query = `*[_type == "main" && language == $lang][0]{
    title,
    backgroundVideo {
      asset-> {
        url,
        originalFilename,
        mimeType,
        size
      }
    },
    backgroundVideoMobile {
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
      { lang },
      {
        next: { revalidate: 0, tags: ["hero", "content"] },
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
    images[] {
      asset-> {
        _id,
        url,
        metadata {
          dimensions
        }
      }
    }
  }`;

  try {
    return await sanityClient.fetch(
      query,
      {},
      {
        next: { revalidate: 0, tags: ["aboutUs"] },
      }
    );
  } catch (error) {
    console.error("Error fetching about us data:", error);
    return null;
  }
}

export async function getFacilitiesData(
  lang: string = "en"
): Promise<FacilitiesType | null> {
  const query = `*[_type == "facilities" && language == $lang][0]{
    accordions[] {
      title,
      items,
      images[] {
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        }
      }
    }
  }`;

  try {
    return await sanityClient.fetch(
      query,
      { lang },
      {
        next: { revalidate: 0, tags: ["facilities"] },
      }
    );
  } catch (error) {
    console.error("Error fetching facilities data:", error);
    return null;
  }
}

export async function getTestimonialsData(
  lang: string = "en"
): Promise<TestimonialsType | null> {
  const query = `*[_type == "testimonials" && language == $lang][0]{
    testimonials[] {
      name,
      content
    }
  }`;

  try {
    return await sanityClient.fetch(
      query,
      { lang },
      {
        next: { revalidate: 0, tags: ["testimonials"] },
      }
    );
  } catch (error) {
    console.error("Error fetching testimonials data:", error);
    return null;
  }
}

export async function getBlogPosts(
  lang: string = "en"
): Promise<BlogPost[] | null> {
  const query = `*[_type == "blog" && language == $lang] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    "author": author->{name, image, bio},
    "categories": categories[]->{title, description}
  }`;

  try {
    return await sanityClient.fetch(
      query,
      { lang },
      {
        next: { revalidate: 0, tags: ["blog", "content"] },
      }
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPost(
  slug: string,
  lang: string = "en"
): Promise<BlogPost | null> {
  const query = `*[_type == "blog" && slug.current == $slug && language == $lang][0] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    "author": author->{name, image, bio},
    "categories": categories[]->{title, description}
  }`;

  try {
    return await sanityClient.fetch(
      query,
      { slug, lang },
      {
        next: { revalidate: 0, tags: [`blog-post-${slug}`, "content"] },
      }
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}
