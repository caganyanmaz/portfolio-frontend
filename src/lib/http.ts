import { ZodError } from 'zod';

export function badRequestFromZod(e: ZodError) {
  return Response.json({ error: e.flatten() }, { status: 400 });
}