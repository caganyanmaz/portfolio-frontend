import { NextResponse, type NextRequest } from 'next/server';
import { api } from '@/lib/api';
import { z } from 'zod';

const CtxSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
});

export async function GET(_req: NextRequest, ctx: unknown) {
  const parsed = CtxSchema.safeParse(ctx);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const id = Number(parsed.data.params.id);
  const project = await api.getById<any>('projects', id, { populate: '*' });
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ project });
}
