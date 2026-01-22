/** @type {import('next').NextConfig} */

const nextConfig = {
  compress: true,
  distDir: "build",
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
