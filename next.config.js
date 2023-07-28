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
      },
      {
        protocol: "https",
        hostname: "ipfs-2.thirdwebcdn.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "dummyimage.com",
        port: "",
      },
    ],
  },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
};

nextConfig.experiments = { topLevelAwait: true };
