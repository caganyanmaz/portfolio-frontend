import { notFound } from "next/navigation";
import { portfolioApi } from "@/lib/portfolio-api";
import type { BlogDetail } from "@/types/strapi";

type Params = { documentId: string };

export const dynamic = "force-dynamic"; // or: export const revalidate = 0;

export default async function BlogDetailPage({ params }: { params: Params }) {
  const post = await portfolioApi.getBlogByDocumentId(params.documentId);
  if (!post) return notFound();

  return (
    <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl p-6">
      {post.thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.thumbnail.url}
          alt={post.thumbnail.alternativeText ?? post.title}
          className="w-full rounded-2xl mb-6"
        />
      )}

      <h1>{post.title}</h1>
      {post.summary && <p className="lead">{post.summary}</p>}

      {/* Replace this with your real rich-text/blocks renderer later */}
      <BlocksDebug blocks={post.content} />
    </article>
  );
}

/** TEMP: simple renderer — shows your blocks JSON for now. Swap for a real renderer later. */
function BlocksDebug({ blocks }: { blocks: BlogDetail["content"] }) {
  return (
    <pre className="bg-neutral-900/5 p-4 rounded-xl overflow-auto text-sm">
      {JSON.stringify(blocks, null, 2)}
    </pre>
  );
}
