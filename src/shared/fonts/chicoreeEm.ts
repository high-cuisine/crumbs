import localFont from 'next/font/local';

export const chicoreeEm = localFont({
  src: '../assets/fonts/ChicoreeEm-Bold.otf',
  variable: '--font-chicoree-em',
  weight: '700',
  display: 'swap',
  fallback: ['Fredoka', 'sans-serif'],
});
