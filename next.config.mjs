/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kindred-lemming-818.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
