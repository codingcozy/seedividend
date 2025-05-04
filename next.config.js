/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/posts/:category",
        destination: "/posts/:category/1",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
