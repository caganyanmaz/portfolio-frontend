import { NextResponse } from 'next/server';
import { api } from '@/lib/api';
import { ProjectsQuerySchema } from '@/lib/validation';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const raw = Object.fromEntries(url.searchParams.entries());

  const parsed = ProjectsQuerySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { tagId, page, pageSize } = parsed.data;

  const params: any = {
    populate: ['tags', 'thumbnail'],
    sort: ['rank:asc'],
    pagination: { page, pageSize },
  };
  if (tagId) params.filters = { tags: { id: { $eq: tagId } } };

  const projects = await api.getList<any>('projects', params);
  return NextResponse.json({ projects });
}
