/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://172.20.10.4:3000',
    'http://local-origin.dev',
    'http://64.226.76.213:3000',
    'http://64.226.76.213:*',
    'https://64.226.76.213:3000',
    'https://64.226.76.213:*',
    'http://*.local-origin.dev',
    'http://64.226.76.213',
    'https://64.226.76.213',
  ],
}

export default nextConfig;
