import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Минимальный self-contained сервер (.next/standalone) — без dev-зависимостей в рантайме.
  output: 'standalone',
  // better-sqlite3 — нативный модуль, его нельзя бандлить в серверный билд.
  serverExternalPackages: ['better-sqlite3'],
};

export default nextConfig;
