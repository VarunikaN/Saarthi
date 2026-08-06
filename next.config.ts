import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [{ hostname: "myweb-ten-red.vercel.app", protocol: "https" }] },
  turbopack: { root: process.cwd() },
};

export default nextConfig;
