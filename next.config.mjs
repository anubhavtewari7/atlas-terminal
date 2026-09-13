/** @type {import('next').NextConfig} */
const nextConfig = {
  // Opt in locally when Windows cannot launch build workers with piped stdio.
  // Keep type checking enabled and leave normal production builds unchanged.
  ...(process.env.NAUTILUS_BUILD_WORKER_THREADS === '1' && {
    experimental: { workerThreads: true },
  }),

  // ESLint runs separately in CI (GitHub Actions). Skipping it during next build
  // keeps production builds fast and avoids false-positive failures from
  // in-progress lint rules in generated files.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
