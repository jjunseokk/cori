/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['coribucket.s3.ap-northeast-2.amazonaws.com'],
  },
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
