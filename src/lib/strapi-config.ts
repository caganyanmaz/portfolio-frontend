export function getStrapiAssetBase(): string {
  // Prefer a public var for client bundles
  const pub = process.env.NEXT_PUBLIC_STRAPI_ASSET_BASE;
  if (pub) return pub.replace(/\/$/, '');

  // Fallback to server env only when on server
  if (typeof window === 'undefined') {
    const srv = process.env.STRAPI_HOST_ADDRESS;
    if (srv) return srv.replace(/\/$/, '');
  }
  return ''; // allow relative URLs if Strapi already returns absolute
}