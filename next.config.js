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
        hostname: "ipfs.cf-ipfs.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "dummyimage.com",
        port: "",
      },
      {
        protocol: "https",
        hostname:
          "bafybeifqunwldzb3qnchjyzytjp3eyvny5p3b3r5i7syn7cyli6ihe3q4u.ipfs.cf-ipfs.com",
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
