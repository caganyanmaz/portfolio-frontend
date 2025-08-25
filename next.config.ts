import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL((process.env.NEXT_PUBLIC_STRAPI_ASSET_BASE || 'http://localhost:1337') + '/**')]
  }
  /* config options here */
};

export default nextConfig;
