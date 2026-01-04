/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
    ],
    unoptimized: true, // ⬅️ MATIKAN image optimizer Next.js
  },
}

module.exports = nextConfig
