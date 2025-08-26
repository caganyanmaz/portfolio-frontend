// app/api/blogs/route.ts
import { NextResponse } from "next/server";
import { api, type StrapiQuery } from "@/lib/api";
import type { BlogList, SimpleTag } from "@/types/strapi";

// --- tiny normalizers (handle both v4/v5-ish shapes) ---
function normTags(raw: any): SimpleTag[] {
  // v5 often -> array; v5 relational wrapper sometimes -> { data: [...] }
  // v4 -> { data: [{ id, attributes: { name, ... }}, ...] }
  const arr = raw?.data ?? raw ?? [];
  if (!Array.isArray(arr)) return [];
  return arr.map((t: any) => ({
    id: t?.id ?? 0,
    documentId: t?.documentId ?? String(t?.id ?? ""),
    name: t?.name ?? t?.attributes?.name ?? "",
  }));
}

function normThumb(raw: any) {
  // v5 -> { url, name, alternativeText, ... }
  // v4 -> { data: { attributes: { url, alternativeText, name } } }
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

function normalizeBlogList(item: any): BlogList {
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
  };
}

// GET /api/blogs
export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("pagination[page]") ?? "1");
  const pageSize = Number(url.searchParams.get("pagination[pageSize]") ?? "10");
  const tagEq = url.searchParams.get("filters[tags][name][$eq]") ?? undefined;

  const params: StrapiQuery = {
    sort: ["publishedAt:desc"],
    fields: ["title", "summary", "createdAt", "updatedAt", "publishedAt"], // NO content here
    populate: {
      thumbnail: { fields: ["url", "name", "alternativeText"] },
      tags: { fields: ["name"] },
    },
    pagination: { page, pageSize, withCount: true },
    ...(tagEq
      ? { filters: { tags: { name: { $eq: tagEq } } } }
      : {}),
  };

  // Using your server-only Strapi client
  const list = await api.getList<any>("/blogs", params);
  // Your api.getList<T> doesn’t return meta; that’s fine — return empty for now
  const data = list.map(normalizeBlogList);

  return NextResponse.json(
    { data, meta: { pagination: { page, pageSize } } },
    { headers: { "Cache-Control": "no-store" } },
  );
}
