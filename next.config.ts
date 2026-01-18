import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
      {
        // protocol: "https",
        hostname: "10.10.7.7",
      },
    ],
  },
};

export default nextConfig;
