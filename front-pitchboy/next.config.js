/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  images: {
    domains: ["image.tmdb.org"],
  },
};

module.exports = nextConfig;
