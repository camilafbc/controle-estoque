/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  // disable: process.env.NODE_ENV === 'development',
  skipWaiting: true,
  dynamicStartUrl: false,
  runtimeCaching: [
    {
      urlPattern: /\/_next\/static/,
      handler: 'CacheFirst'
    },
    {
      urlPattern: /\/_next\/image/,
      handler: 'CacheFirst'
    },
    {
      urlPattern: /\/api\/auth/,
      handler: 'NetworkOnly'
    },
    {
      urlPattern: ({ request }) => request.mode === 'navigate',
      handler: 'NetworkFirst',
      options: {
        networkTimeoutSeconds: 2,
        cacheName: 'pages-cache',
        expiration: {
          maxEntries: 32
        }
      }
    }
  ],
});

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPWA(nextConfig);
