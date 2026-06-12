import { Link } from "@/i18n/navigation";
import Image from "next/image";

import { getLocale, getTranslations } from "next-intl/server";

import { PortableText } from "@portabletext/react";

import Category from "../Category";
import Author from "../Author";
import BlogCTA from "@/components/BlogCTA";

import { getBlogPost, getBlogPosts } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

import { GoChevronLeft } from "react-icons/go";

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).height(600).url()}
            alt={value.alt || "Blog image"}
            width={800}
            height={600}
            className="rounded-lg mx-auto"
          />
          {value.caption && (
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
};

export async function generateStaticParams() {
  const languages = ["en", "ar"];
  const allPosts = [];

  for (const locale of languages) {
    const posts = await getBlogPosts(locale);
    if (posts) {
      allPosts.push(
        ...posts
          .filter((post) => post.slug?.current)
          .map((post) => ({
            slug: post.slug.current,
          })),
      );
    }
  }

  return allPosts;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const locale = await getLocale();
  const post = await getBlogPost(slug, locale);

  if (!post) {
    return {};
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const metaTitle = post.seo?.seoTitle || post.title;
  const metaDescription = post.seo?.seoDescription || "";
  const ogImage = post.seo?.ogImage
    ? urlFor(post.seo.ogImage).width(1200).height(630).url()
    : post.mainImage
      ? urlFor(post.mainImage).width(1200).height(630).url()
      : undefined;

  const postUrl = `${baseUrl}/${locale}/blog/${slug}`;

  return {
    title: `${metaTitle} | Rose Garden Blog`,
    description: metaDescription,
    alternates: {
      canonical: postUrl,
      languages: {
        en: `${baseUrl}/en/blog/${slug}`,
        ar: `${baseUrl}/ar/blog/${slug}`,
      },
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: postUrl,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: metaTitle,
            },
          ]
        : undefined,
      siteName: "Rose Garden",
      locale: locale === "ar" ? "ar_SA" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [ogImage] : undefined,
    },
    ...(post.seo?.noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

function buildJsonLd(post: BlogPost, locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const metaTitle = post.seo?.seoTitle || post.title;
  const metaDescription = post.seo?.seoDescription || "";
  const ogImage = post.seo?.ogImage
    ? urlFor(post.seo.ogImage).width(1200).height(630).url()
    : post.mainImage
      ? urlFor(post.mainImage).width(1200).height(630).url()
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: metaTitle,
    description: metaDescription,
    image: ogImage,
    url: `${baseUrl}/${locale}/blog/${post.slug.current}`,
    datePublished: post.publishedAt,
    author: post.author?.name
      ? {
          "@type": "Person",
          name: post.author.name,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Rose Garden",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${locale}/blog/${post.slug.current}`,
    },
    inLanguage: locale === "ar" ? "ar-SA" : "en-US",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const locale = await getLocale();

  const post = await getBlogPost(slug, locale);
  const t = await getTranslations("Blog.post");

  if (!post) {
    return (
      <main>
        <div className="max-w-340  py-40 mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {t("not-found")}
          </h1>
          <Link
            href="/blog"
            className="mt-4 inline-flex items-center text-blue-600 hover:underline"
          >
            {t("return")}
          </Link>
        </div>
      </main>
    );
  }

  const jsonLd = buildJsonLd(post, locale);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-340 px-4 sm:px-6 lg:px-20 pt-28 pb-10 mx-auto min-h-screen">
        <div className="lg:col-span-2">
          <div className="py-8 lg:pe-8">
            <div className="space-y-5 lg:space-y-8">
              <Link
                className="inline-flex items-center gap-x-1.5 text-sm text-gray-600 decoration-2 hover:underline focus:outline-hidden focus:underline dark:text-blue-500"
                href="/blog"
              >
                <GoChevronLeft className="shrink-0 size-4 rtl:rotate-180" />
                {t("return")}
              </Link>

              <h1 className="text-3xl leading-[1.4] font-bold lg:text-5xl dark:text-white">
                {post.title}
              </h1>

              {post.publishedAt && (
                <span className="block text-xs sm:text-sm text-gray-800 dark:text-neutral-200">
                  {new Date(post.publishedAt).toLocaleDateString(
                    locale === "ar" ? "ar-EG" : "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </span>
              )}

              {post.mainImage && (
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
                  <Image
                    src={urlFor(post.mainImage).width(1200).height(675).url()}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <article className="prose prose-lg dark:prose-invert max-w-none">
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              </article>

              {post.cta && <BlogCTA cta={post.cta} />}

              {post.author && (
                <Author
                  className="flex justify-between items-center"
                  name={post.author.name}
                  image={post.author.image}
                  bio={post.author.bio}
                />
              )}

              {post.categories && (
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-y-5 lg:gap-y-0">
                  <div>
                    {post.categories.map((category, i) => (
                      <Category
                        key={i}
                        className="rounded-full"
                        title={category.title}
                        description={category.description}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
