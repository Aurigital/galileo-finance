/** @type {import('next').NextConfig} */

const nextConfig = {
  compress: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'galileoblog.aurigital.com',
      }
    ]
  }
};

export default nextConfig;
