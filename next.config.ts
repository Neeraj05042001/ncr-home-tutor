import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages deployment
  output: 'export',

  // Clean URLs
  trailingSlash: true,

  // Images — unoptimized required for static export
  images: {
    unoptimized: true,
  },

  // Empty turbopack config — silences the webpack/turbopack conflict warning
  // SVG icons are written as inline React components — no webpack plugin needed
  turbopack: {},
}

export default nextConfig