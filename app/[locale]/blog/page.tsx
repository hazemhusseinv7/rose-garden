import { Link } from "@/i18n/navigation";
import Image from "next/image";

import { getLocale, getTranslations } from "next-intl/server";

import { getBlogPosts } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

import { GoChevronRight } from "react-icons/go";

import BlogPaginationClient from "./BlogPaginationClient";

const POSTS_PER_PAGE = 6;

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "Blog" });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    title: `${t("title")} | Rose Garden`,
    description:
      locale === "ar"
        ? "اقرأ أحدث المقالات والأخبار من روز جاردن الشفا"
        : "Read the latest articles and news from Rose Garden Al-Shafa",
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
      languages: {
        en: `${baseUrl}/en/blog`,
        ar: `${baseUrl}/ar/blog`,
      },
    },
    openGraph: {
      title: `${t("title")} | Rose Garden`,
      description:
        locale === "ar"
          ? "اقرأ أحدث المقالات والأخبار من روز جاردن الشفا"
          : "Read the latest articles and news from Rose Garden Al-Shafa",
      url: `${baseUrl}/${locale}/blog`,
      type: "website",
      siteName: "Rose Garden",
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("title")} | Rose Garden`,
      description:
        locale === "ar"
          ? "اقرأ أحدث المقالات والأخبار من روز جاردن الشفا"
          : "Read the latest articles and news from Rose Garden Al-Shafa",
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const locale = await getLocale();
  const t = await getTranslations("Blog");
  const { page } = await searchParams;

  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);
  const allPosts = (await getBlogPosts(locale)) || [];
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <main>
      <div className="max-w-340 px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14 mx-auto">
        <div className="relative flex w-full flex-col items-center justify-center pt-32 sm:pt-40 pb-32">
          <h1 className="after:from-background after:to-foreground relative max-w-[12ch] text-4xl lg:text-8xl uppercase leading-tight opacity-70 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-linear-to-b after:content-['']">
            {t("title")}
          </h1>
        </div>

        {!allPosts || allPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-neutral-400">
              {t("not-found")}
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPosts.map(({ _id, title, slug, mainImage }) => (
                <Link
                  className="group bg-gray-200/70 hover:bg-gray-300/70 focus:outline-hidden focus:bg-gray-100 rounded-xl p-5 transition dark:bg-white/5 dark:hover:bg-white/20 dark:focus:bg-white/10"
                  href={`/blog/${slug?.current || "#"}`}
                  key={_id}
                >
                  <div className="aspect-16/10">
                    <Image
                      className="size-full object-cover rounded-xl"
                      width={400}
                      height={250}
                      src={urlFor(mainImage).width(400).height(250).url()}
                      alt={title}
                    />
                  </div>
                  <span className="block mt-5 text-xl text-gray-800 dark:text-neutral-300 dark:hover:text-white">
                    {title}
                  </span>
                  <div className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800 dark:text-neutral-200">
                    {t("read-more")}
                    <GoChevronRight className="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1 group-focus:-translate-x-1 rtl:group-hover:-translate-x-1 rtl:group-focus:translate-x-1 rtl:rotate-180" />
                  </div>
                </Link>
              ))}
            </div>

            <BlogPaginationClient
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        )}
      </div>
    </main>
  );
}
