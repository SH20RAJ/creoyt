import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // External packages for server components
  serverExternalPackages: ['@libsql/client'],

  // Empty turbopack config to silence warnings
  turbopack: {},

  // Optimize output for edge runtime
  output: 'standalone',
};

export default nextConfig;

// Enable Cloudflare development support
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();