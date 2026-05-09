import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["framer-motion"],
  sassOptions: {
    implementation: 'sass-embedded'
  }
};

export default nextConfig;
