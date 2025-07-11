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
    'http://localhost:3000', // local host uchun
    'http://172.20.10.4:3000', // sizning IP-manzilingiz
    'http://local-origin.dev',
    'http://*.local-origin.dev',
  ],
}

export default nextConfig;
