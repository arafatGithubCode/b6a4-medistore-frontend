import { env } from "@/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${env.BACKEND_URL}/api/auth/:path*`,
      },
      {
        source: "/api/v1/:path*",
        destination: `${env.BACKEND_URL}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
