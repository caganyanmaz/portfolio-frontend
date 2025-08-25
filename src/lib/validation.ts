// /src/lib/validation.ts
import { z } from 'zod';

export const ProjectsQuerySchema = z.object({
  // turns "123" (or 123) into number, rejects NaN
  tagId: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(12),
});

export const ProjectIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});
