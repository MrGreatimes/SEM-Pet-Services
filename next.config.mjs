/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Native file-watching was unreliable on this Windows setup (live-reload
    // wasn't firing), so we poll instead. Keep the interval gentle and skip the
    // big/regenerated dirs to limit CPU churn.
    config.watchOptions = {
      poll: 2000,
      aggregateTimeout: 500,
      ignored: ["**/node_modules", "**/.next"],
    };
    return config;
  },
};

export default nextConfig;
