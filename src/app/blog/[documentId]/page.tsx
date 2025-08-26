// /src/app/blog/[documentId]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ScrollAnimation from "@/components/ScrollAnimation";
import { portfolioApi } from "@/lib/portfolio-api";
import { processBlogDetail } from "@/lib/strapi-utils";
import type { BlogDetail } from "@/types/strapi";

type Params = { documentId: string };

// keep your choice here; if you want ISR, swap to `export const revalidate = 60`
export const dynamic = "force-dynamic";

export default async function BlogDetailPage({ params }: { params: Params }) {
  const raw = await portfolioApi.getBlogByDocumentId(params.documentId);
  const post = processBlogDetail(raw);
  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900">
      {/* Header */}
      <section className="container mx-auto px-4 pt-16 pb-8">
        <ScrollAnimation>
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-white/80 hover:text-white transition"
            >
              <span aria-hidden className="mr-2">←</span> All posts
            </Link>

            <h1 className="mt-6 text-3xl md:text-5xl font-bold text-white leading-tight">
              {post.title}
            </h1>

            {/* Optional meta row (date / reading time) if you have them */}
            {(post.publishedAt) && (
              <p className="mt-3 text-sm text-gray-300">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : null}
                {post.publishedAt ? " • " : ""}
              </p>
            )}

            {/* Tags */}
            {post.tags?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span
                    key={t.documentId ?? t.name}
                    className="text-xs text-white/90 bg-white/10 px-2 py-1 rounded"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </ScrollAnimation>
      </section>

      {/* Hero image */}
      {post.thumbnail && (
        <section className="container mx-auto px-4 pb-6">
          <ScrollAnimation>
            <div className="max-w-4xl mx-auto">
              <Image
                priority
                width={1600}
                height={900}
                src={post.thumbnail.url}
                alt={post.thumbnail.alternativeText ?? post.title}
                className="w-full h-auto rounded-2xl object-cover shadow-2xl shadow-black/20 transition-transform duration-300 hover:scale-[1.01]"
              />
            </div>
          </ScrollAnimation>
        </section>
      )}

      {/* Content */}
      <section className="container mx-auto px-4 pb-20">
        <ScrollAnimation>
          <article className="max-w-3xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8">

            {/* Typography aligned with index (light on neutral, inverted in dark) */}
            <div className="prose prose-invert prose-headings:scroll-mt-24 prose-img:rounded-xl max-w-none">
              {/* TODO: Replace with your real rich-text/blocks renderer */}
              <BlocksDebug blocks={post.content} />
            </div>
          </article>

          {/* Footer nav */}
          <div className="max-w-3xl mx-auto mt-8 flex items-center justify-between text-sm">
            <Link
              href="/blog"
              className="text-white/80 hover:text-white transition"
            >
              ← Back to Blog
            </Link>
            {/* If you later add prev/next, put them here */}
          </div>
        </ScrollAnimation>
      </section>
    </div>
  );
}

/** TEMP: simple renderer — shows your blocks JSON for now. Swap for a real renderer later. */
function BlocksDebug({ blocks }: { blocks: BlogDetail["content"] }) {
  return (
    <pre className="bg-neutral-900/60 text-gray-200 p-4 rounded-xl overflow-auto text-xs leading-relaxed">
      {JSON.stringify(blocks, null, 2)}
    </pre>
  );
}
