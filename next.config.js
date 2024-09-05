/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images:{
    domains:["https://storage.googleapis.com"],
  }
}

module.exports = nextConfig
