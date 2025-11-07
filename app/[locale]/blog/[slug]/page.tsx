import Link from "next/link";
import Image from "next/image";

import { getTranslations } from "next-intl/server";

import { PortableText } from "@portabletext/react";

import Category from "@/app/[locale]/blog/Category";
import Author from "@/app/[locale]/blog/Author";

import { getBlogPost, getBlogPosts } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

import { GoChevronLeft } from "react-icons/go";

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
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

// Generate static params for SSG
export async function generateStaticParams() {
  const posts = await getBlogPosts();

  if (!posts) return [];

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  const t = await getTranslations("Blog.post");

  if (!post) {
    return (
      <main>
        <div className="max-w-340 p-4 sm:p-6 lg:p-20 mx-auto text-center">
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

  return (
    <main>
      {/* Blog Article */}
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

              <h1 className="text-3xl font-bold lg:text-5xl dark:text-white">
                {post.title}
              </h1>

              {post.publishedAt && (
                <span className="block text-xs sm:text-sm text-gray-800 dark:text-neutral-200">
                  {new Date(post.publishedAt).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}

              <article className="prose prose-lg dark:prose-invert max-w-none">
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              </article>

              {post.author && (
                // Avatar Media
                <Author
                  className="flex justify-between items-center"
                  name={post.author.name}
                  image={post.author.image}
                  bio={post.author.bio}
                />
                // End Avatar Media
              )}

              {post.categories && (
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-y-5 lg:gap-y-0">
                  {/* Categories Tags */}
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
                  {/* End Categories Tags */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* End Blog Article */}
    </main>
  );
}
