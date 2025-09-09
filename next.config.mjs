/** @type {import('next').NextConfig} */

const nextConfig = {
  compress: true, 
  output: "export",
  distDir: "build",
  images: {
    unoptimized: true
  }
};

export default nextConfig;
