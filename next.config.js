/** @type {import('next').NextConfig} */ 
const nextConfig = {  reactStrictMode: false,
  webpack5: true,
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };
    return config;
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'openseauserdata.com',
      'brand.assets.adidas.com',
      'media0.giphy.com',
      'avatars.dicebear.com',
      'media1.giphy.com',
      'media3.giphy.com',
      'media2.giphy.com',
      'media4.giphy.com',
      'i.etsystatic.com',
      'ipfs.moralis.io'
    ],
  },
}

module.exports = nextConfig