import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.ebrazclinic.ir"
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
