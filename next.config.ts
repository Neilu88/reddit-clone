import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["utfs.io"], // Allow 'utfs.io' to be used for images
  },
};

export default nextConfig;
