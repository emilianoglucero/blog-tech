const withBundleAnalyzer = require('@next/bundle-analyzer')

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: false,
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value:
              'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ]
      }
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Adding remotePatterns to allow images from specific external domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blog-tech-payload-cms.onrender.com' // Replace 'example.com' with the domain you want to allow
        // Optional: Specify a port (if necessary)
        // Optional: Specify a pathname pattern (if necessary)
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co' // Spotify
      },
      {
        protocol: 'https',
        hostname: 'image-cdn-ak.spotifycdn.com' // Spotify
      },
      {
        protocol: 'https',
        hostname: 'image-cdn-fa.spotifycdn.com' // Spotify
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
