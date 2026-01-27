/** @type {import('next').NextConfig} */

const nextConfig = {
  compress: true,
  distDir: "build",
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
