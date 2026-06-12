import type { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  const locales = ["en", "ar"];
  const currentDate = new Date();

  const staticPages = [
    { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
    {
      path: "/reservation",
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      path: "/facilities",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/contact",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    { path: "/blog", changeFrequency: "weekly" as const, priority: 0.6 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }

    try {
      const posts = await sanityClient.fetch(
        `*[_type == "blog" && language == $lang && !defined(seo.noIndex)] | order(publishedAt desc) {
          "slug": slug.current,
          publishedAt
        }`,
        { lang: locale }
      );

      for (const post of posts) {
        entries.push({
          url: `${baseUrl}/${locale}/blog/${post.slug}`,
          lastModified: post.publishedAt
            ? new Date(post.publishedAt)
            : currentDate,
          changeFrequency: "monthly" as const,
          priority: 0.5,
        });
      }
    } catch (error) {
      console.error(`Error fetching blog posts for ${locale} sitemap:`, error);
    }
  }

  return entries;
}
