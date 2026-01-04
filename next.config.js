/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // 🔧 Backend lokal
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
      // 🚀 Backend production
      {
        protocol: "https",
        hostname: "api.telkomeat.my.id",
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
