// /src/lib/api.ts
import 'server-only';
import axios, { AxiosError, isAxiosError } from 'axios';
import qs from 'qs';

/** --------- HARD SERVER GUARD --------- */
if (typeof window !== 'undefined') {
  throw new Error('Do not import src/lib/api.ts in client/browser code.');
}

/** --------- CONFIG --------- */
const STRAPI_URL = (process.env.STRAPI_HOST_ADDRESS || 'http://localhost:1337').replace(/\/$/, '');
const API_TOKEN = process.env.STRAPI_TOKEN;

// Optional: temporarily force v4 format while migrating particular calls
// export const STRAPI_FORCE_V4_RESP = process.env.STRAPI_FORCE_V4_RESP === '1';

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line no-console
  console.log('[Strapi] URL:', STRAPI_URL, 'Token?', Boolean(API_TOKEN));
}

/** --------- AXIOS INSTANCE (Strapi v5) --------- */
export const strapiApi = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
    // ...(STRAPI_FORCE_V4_RESP ? { 'Strapi-Response-Format': 'v4' } : {}), // safety switch if ever needed
  },
  timeout: 10_000,
  paramsSerializer: (params) => qs.stringify(params, { encodeValuesOnly: true }),
});

/** --------- TYPES & HELPERS --------- */
export type StrapiQuery = {
  filters?: Record<string, any>;
  populate?: any;
  sort?: string | string[];
  fields?: string[]; // v5 still uses "fields" (select) for top-level fields
  pagination?: { page?: number; pageSize?: number; start?: number; limit?: number; withCount?: boolean };
  /** v4 -> v5: publicationState was replaced by "status" ("published" | "draft") */
  status?: 'published' | 'draft';
  locale?: string;
};

export type WithId<T> = T & { id: number; documentId?: string };

/**
 * v5 returns flattened attributes + "documentId".
 * v4 returns { id, attributes: {...} }.
 * This function accepts both.
 */
const flatten = <T>(item: any): WithId<T> => {
  if (!item) return { id: 0 } as WithId<T>;

  // If this is v4-style { id, attributes }
  if (typeof item === 'object' && 'attributes' in item) {
    const id = typeof item.id === 'number' ? item.id : 0;
    const attrs = (item.attributes ?? {}) as Record<string, unknown>;
    // Keep documentId if the backend adds it inside attributes or alongside
    const documentId = (attrs.documentId ?? item.documentId) as string | undefined;
    return { id, documentId, ...(attrs as any) } as WithId<T>;
  }

  // v5-style is already flat (and includes id + documentId fields on the root)
  const id = typeof item.id === 'number' ? item.id : 0;
  return { id, ...(item as any) } as WithId<T>;
};

const extractOne = <T>(res: any): WithId<T> | null => {
  const data = res?.data?.data ?? res?.data;
  if (!data) return null;
  return flatten<T>(data);
};

const extractMany = <T>(res: any): Array<WithId<T>> => {
  const data = res?.data?.data ?? res?.data;
  if (!Array.isArray(data)) return [];
  return data.map((x: any) => flatten<T>(x));
};

function logAxiosError(context: string, err: unknown) {
  if (isAxiosError(err)) {
    const e = err as AxiosError<any>;
    const payload = {
      message: e.message,
      name: e.name,
      code: e.code ?? null,
      status: e.response?.status ?? null,
      data: e.response?.data ?? null,
      request: {
        url: `${e.config?.baseURL ?? ''}${e.config?.url ?? ''}`,
        method: e.config?.method ?? null,
        params: e.config?.params ?? null,
        authHeader: Boolean(e.config?.headers && 'Authorization' in (e.config!.headers as any)),
      },
    };
    // eslint-disable-next-line no-console
    console.error(`[Strapi] ${context} failed -> ${JSON.stringify(payload, null, 2)}`);
  } else {
    // eslint-disable-next-line no-console
    console.error(`[Strapi] ${context} failed (non-Axios):`, err);
  }
}

/** --------- PUBLIC API --------- */
export const api = {
  /** GET a collection endpoint (array) */
  async getList<T>(endpoint: string, params?: StrapiQuery): Promise<Array<WithId<T>>> {
    try {
      const res = await strapiApi.get(endpoint, { params });
      return extractMany<T>(res);
    } catch (e) {
      logAxiosError(`getList ${endpoint}`, e);
      return [];
    }
  },

  /** GET a single type endpoint (object) */
  async getSingle<T>(endpoint: string, params?: StrapiQuery): Promise<WithId<T> | null> {
    try {
      const res = await strapiApi.get(endpoint, { params });
      return extractOne<T>(res);
    } catch (e) {
      logAxiosError(`getSingle ${endpoint}`, e);
      return null;
    }
  },

  /** GET by id from a collection */
  async getById<T>(endpoint: string, id: string | number, params?: StrapiQuery): Promise<WithId<T> | null> {
    try {
      const res = await strapiApi.get(`${endpoint}/${id}`, { params });
      return extractOne<T>(res);
    } catch (e) {
      logAxiosError(`getById ${endpoint}/${id}`, e);
      return null;
    }
  },

  /** POST (create) — keep passing what your controllers expect.
   * For core collection types via REST, Strapi expects { data: {...} }.
   */
  async post<T>(endpoint: string, data: any, params?: StrapiQuery): Promise<WithId<T> | null> {
    try {
      const res = await strapiApi.post(endpoint, data, { params });
      return extractOne<T>(res);
    } catch (e) {
      logAxiosError(`post ${endpoint}`, e);
      return null;
    }
  },
};

export const STRAPI_BASE_URL = STRAPI_URL;
