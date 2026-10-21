import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Room for an order with its photos. Vercel won't accept a request
      // over 4.5 MB, so this stays just under that.
      bodySizeLimit: "4.4mb",
    },
  },
};

export default nextConfig;
