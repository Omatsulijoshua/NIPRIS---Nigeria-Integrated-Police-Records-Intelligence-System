/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@nipris/types", "@nipris/ui", "@nipris/auth", "@nipris/permissions"],
  reactStrictMode: true,
};

module.exports = nextConfig;
