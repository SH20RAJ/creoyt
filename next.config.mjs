/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  // Enable static exports for Cloudflare Pages
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
