const withBundleAnalyzer = require('@next/bundle-analyzer')

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Adding remotePatterns to allow images from specific external domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blog-tech-payload-cms.onrender.com' // Replace 'example.com' with the domain you want to allow
        // Optional: Specify a port (if necessary)
        // Optional: Specify a pathname pattern (if necessary)
      }
      // You can add more domains as needed
    ]
  },
  experimental: {}
}

module.exports = (_phase, { defaultConfig: _ }) => {
  const plugins = [
    withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })
  ]
  return plugins.reduce((acc, plugin) => plugin(acc), { ...config })
}
