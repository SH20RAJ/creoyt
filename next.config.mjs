/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  rules: { "react/no-unescaped-entities": 0 },
};

export default nextConfig;
