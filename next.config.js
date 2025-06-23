/** @type {import('next').NextConfig} */
const nextConfig = {
  // 動的サイト設定（Vercel用）
  // output: 'export', // 静的エクスポートを無効化
  
  // 画像最適化を有効化（動的サイト用）
  images: {
    domains: ['katekyotsunagu.com'],
    unoptimized: false
  },

  // App router is available by default in Next.js 13.5+
}

module.exports = nextConfig