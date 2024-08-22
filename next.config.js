const { withNextVideo } = require('next-video/process')

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "https://chat-with-pdf-lake.vercel.app/api/:path*"
            : "/api/",
      },
    ];
  },
};

module.exports = withNextVideo(nextConfig);
