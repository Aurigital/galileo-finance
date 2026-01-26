/** @type {import('next').NextConfig} */

const nextConfig = {
  compress: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'galieloblog.aurigital.com',
      }
    ]
  }
};

export default nextConfig;
