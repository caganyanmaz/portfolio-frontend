// app/api/blogs/[documentId]/route.ts
import { NextResponse } from "next/server";
import { api, type StrapiQuery } from "@/lib/api";
import type { BlogDetail, SimpleTag } from "@/types/strapi";

type Params = { documentId: string };

export const dynamic = "force-dynamic";


// Reuse the same helpers from the list route
function normTags(raw: any): SimpleTag[] {
  const arr = raw?.data ?? raw ?? [];
  if (!Array.isArray(arr)) return [];
  return arr.map((t: any) => ({
    id: t?.id ?? 0,
    documentId: t?.documentId ?? String(t?.id ?? ""),
    name: t?.name ?? t?.attributes?.name ?? "",
  }));
}

function normThumb(raw: any) {
  const v5 = raw && typeof raw === "object" && "url" in raw ? raw : null;
  const v4 = raw?.data?.attributes ?? null;
  const src = v5 ?? v4;
  if (!src) return null;
  return {
    url: src.url ?? "",
    name: src.name ?? null,
    alternativeText: src.alternativeText ?? null,
  };
}

function normalizeBlogDetail(item: any): BlogDetail {
  return {
    id: item.id,
    documentId: item.documentId ?? String(item.id),
    title: item.title,
    summary: item.summary ?? null,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    publishedAt: item.publishedAt ?? null,
    thumbnail: normThumb(item.thumbnail),
    tags: normTags(item.tags),
    content: Array.isArray(item.content) ? item.content : (item.content ?? []),
  };
}

// GET /api/blogs/:documentId
export async function GET(_req: Request, ctx: { params: Promise<Params> } ) {
  const { documentId } = await ctx.params;

  const params: StrapiQuery = {
    // Include content on detail
    fields: ["title", "summary", "createdAt", "updatedAt", "publishedAt", "content"],
    populate: {
      thumbnail: { fields: ["url", "name", "alternativeText"] },
      tags: { fields: ["name"] },
    },
  };

  // Your client does GET /api/blogs/:id — with v5 we pass documentId; with v4 it’ll still work with numeric id
  const item = await api.getById<any>("/blogs", documentId, params);

  if (!item) {
    return NextResponse.json({ data: null, meta: {} }, { status: 404 });
  }

  const data = normalizeBlogDetail(item);

  return NextResponse.json(
    { data, meta: {} },
    { headers: { "Cache-Control": "no-store" } },
  );
}