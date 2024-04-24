/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
