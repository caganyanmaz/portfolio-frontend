import { NextResponse } from 'next/server';
import { api } from '@/lib/api'; // server-only client

// Cache: 60s ISR + tag so you can revalidate on demand
export const revalidate = 60;

export async function GET() {
  const data = await api.getSingle<any>('/home-page', {
    // simple & robust
    populate: { deep: { count: 3 } },
  });

  // Optional: shape/strip any fields before sending to the browser
  return NextResponse.json({ home: data }, { status: data ? 200 : 404 });
}