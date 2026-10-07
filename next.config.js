const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
    formats: ['image/avif', 'image/webp'],
  },
  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
  // SEO optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  // Add trailing slashes for better SEO
  trailingSlash: false,
  async rewrites() {
    return [
      {
        source: '/unity',
        destination: 'https://unity-lp.netlify.app/unity',
      },
      {
        source: '/unity/:path*',
        destination: 'https://unity-lp.netlify.app/unity/:path*',
      },
      {
        source: '/__forms.html',
        destination: 'https://unity-lp.netlify.app/unity/__forms.html',
      },
    ]
  },
}

module.exports = withBundleAnalyzer( nextConfig)
