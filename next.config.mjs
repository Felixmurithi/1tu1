/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iyletuavxrvmaljdjcoi.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/user_profile_images/**",
      },
    ],
  },
};

export default nextConfig;
