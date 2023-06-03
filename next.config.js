/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      }
    ],
  },
};

nextConfig.experiments = { topLevelAwait: true };
