/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  async rewrites() {
    return [
      {
        source: "/api",
        destination: "http://localhost:8000/users",
      },
    ];
  },
};

export default nextConfig;
