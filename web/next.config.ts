import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  outputFileTracingIncludes: {
    "*": ["./data/szczep.db"],
  },
  devIndicators: false,
};

export default nextConfig;
