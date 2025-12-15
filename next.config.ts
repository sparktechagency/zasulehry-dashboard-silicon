import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
    ],
  },

  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  },
};

export default nextConfig;
