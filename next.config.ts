// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   // Static export for Cloudflare Pages deployment
//   output: "export",

//   // Clean URLs
//   trailingSlash: true,

//   // Images — unoptimized required for static export
//   images: {
//     unoptimized: true,
//   },

//   // Empty turbopack config — silences the webpack/turbopack conflict warning
//   // SVG icons are written as inline React components — no webpack plugin needed
//   turbopack: {},
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No output: "export" — Vercel runs Next.js natively
  
  turbopack: {},

  images: {
    unoptimized: true, // keep your existing setting
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // needed for ID proof file uploads
    },
  },
};

export default nextConfig;