/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Das ist der magische Schalter für statisches Hosting!
  trailingSlash: true,
  images: {
    unoptimized: true, // Nötig, da Netcup kein Node.js-Backend für Bildoptimierung hat
  },
};

export default nextConfig;
