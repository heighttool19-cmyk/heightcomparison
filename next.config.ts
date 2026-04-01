import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        missing: [
          {
            type: 'header',
            key: 'RSC',
          },
          {
            type: 'header',
            key: 'Next-Router-Prefetch',
          },
        ],
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
