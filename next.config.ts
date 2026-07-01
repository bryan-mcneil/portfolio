import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site served from Hostinger shared hosting: no Node server,
  // so no on-demand image optimization or API routes.
  output: "export",
  images: {
    unoptimized: true,
  },
  // Emit /about/index.html so plain file hosting resolves /about/ cleanly.
  trailingSlash: true,
};

export default nextConfig;
