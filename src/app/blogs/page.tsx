// /src/app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import ScrollAnimation from "@/components/ScrollAnimation";
import { portfolioApi } from "@/lib/portfolio-api";
import { processBlogsList } from "@/lib/strapi-utils";
import type { BlogList } from "@/types/strapi";

export const revalidate = 60;

export default async function BlogIndexPage() {
  const raw = await portfolioApi.getBlogsList(1, 10);
  const blogs = processBlogsList(raw.blogs);
  const meta = raw.meta;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900">
      {/* Header Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <ScrollAnimation>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Blog</h1>
          {meta?.pagination && (
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Page {meta.pagination.page} / {meta.pagination.pageCount} — {meta.pagination.total} posts
            </p>
          )}
        </ScrollAnimation>
      </section>

      {/* Blog list */}
      <section className="container mx-auto px-4 pb-16">
        <div className="divide-y divide-white/10">
          {blogs.map((post) => (
            <ScrollAnimation key={post.documentId}>
              <BlogCard post={post} />
            </ScrollAnimation>
          ))}
        </div>
      </section>
    </div>
  );
}

function BlogCard({ post }: { post: BlogList }) {
  return (
    <article className="py-4 first:pt-0 last:pb-0">
      <Link
        href={`/blog/${post.documentId}`}
        className="group flex gap-4 items-start"
      >
        {post.thumbnail ? (
          <Image
            width={240}
            height={160}
            src={post.thumbnail.url}
            alt={post.thumbnail.alternativeText ?? post.title}
            className="w-40 h-28 md:w-60 md:h-36 object-cover rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-40 h-28 md:w-60 md:h-36 rounded-xl shrink-0 bg-white/5" />
        )}

        <div className="min-w-0">
          <h2 className="text-lg md:text-xl font-semibold leading-snug text-white group-hover:underline">
            {post.title}
          </h2>

          {post.summary && (
            <p className="text-sm text-gray-300/90 mt-1 line-clamp-2">
              {post.summary}
            </p>
          )}

          {post.tags?.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t.documentId}
                  className="text-xs text-white/90 bg-white/10 px-2 py-1 rounded"
                >
                  {t.name}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
