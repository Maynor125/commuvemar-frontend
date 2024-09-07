/** @type {import('next').NextConfig} */


const nextConfig = {
  experimental: {
    appDir: true,
  },
  images:{
    domains:["https://storage.googleapis.com"],
  },
  fonts: {
    manifest: './fonts/manifest.json',
    timeout: 30000,
  },
}

module.exports = nextConfig
