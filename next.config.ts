import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  //images.unsplash.com  add this
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
