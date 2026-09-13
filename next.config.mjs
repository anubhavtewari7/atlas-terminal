/** @type {import('next').NextConfig} */
const nextConfig = {
  // Opt in locally when Windows cannot launch build workers with piped stdio.
  // Keep type checking enabled and leave normal production builds unchanged.
  ...(process.env.NAUTILUS_BUILD_WORKER_THREADS === '1' && {
    experimental: { workerThreads: true },
  }),
};

export default nextConfig;
