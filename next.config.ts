import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // better-sqlite3 — нативный модуль, его нельзя бандлить в серверный билд.
  serverExternalPackages: ['better-sqlite3'],
};

export default nextConfig;
