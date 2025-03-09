import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  output: 'standalone',
  experimental: {
    serverMinification: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Add optimizations to reduce bundle size
    optimizeCss: true,
    optimizePackageImports: ['react-icons'],
  },
  // Configure image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Reduce webpack cache size
  webpack: (config, { dev, isServer }) => {
    // Only enable source maps in development
    if (!dev) {
      config.devtool = false;
    }
    
    // Optimize bundle size
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
    };
    
    return config;
  },
};

export default withMDX(nextConfig);
