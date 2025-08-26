import { NextResponse } from 'next/server';
import { api } from '@/lib/api';

export const revalidate = 60;

export async function GET() {
  const params = {
    populate: {
      HighlightedProjects: {
       	populate: ['tags', 'Thumbnail'],
      },
      TechStacks: {
        populate: ['tags'],
      },
      // add other single-type fields if needed
    },
  } as const;

  const home = await api.getSingle<any>('/home-page', params);
  return NextResponse.json({ home }, { status: home ? 200 : 404 });
}

