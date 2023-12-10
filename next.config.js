/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com","unsplash.com"],
    unoptimized: true,
  },
}

module.exports = nextConfig
