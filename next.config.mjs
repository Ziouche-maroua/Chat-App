/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // This will disable linting during build on Vercel
  },
  images: {
    domains: ['res.cloudinary.com'], //upload images with cloudinary
  },
};

export default nextConfig;
