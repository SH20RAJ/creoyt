import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig & { images?: any } = {
  // External packages for server components - removed @libsql/client to avoid bundling issues
  serverExternalPackages: [],

  // Empty turbopack config to silence warnings
  turbopack: {},

  // Disable typescript build errors
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Optimize output for edge runtime
  output: 'standalone',

  // Explicit webpack configuration for path resolution
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve('./src'),
    };
    
    // Handle libsql client issues for Cloudflare Workers
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },

  // Allow images from any remote host and accept SVGs; mark unoptimized to bypass domain restrictions
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/:path*',
      },
      {
        protocol: 'http',
        hostname: '**',
        pathname: '/:path*',
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
};

export default nextConfig;

// Enable Cloudflare development support
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

// Cloudflare local dev helpers can only run when `next dev` starts a server.
const isNextDevCommand =
  process.env.NODE_ENV === 'development' &&
  process.argv.some((arg) => arg.includes('dev'));

if (isNextDevCommand) {
  initOpenNextCloudflareForDev();
}
