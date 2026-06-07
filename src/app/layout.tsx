import type { Metadata } from 'next';
import { Fredoka, Montserrat, Montserrat_Alternates } from 'next/font/google';
import { classNames } from '@/shared/helpers/classNames';
import { chicoreeEm } from '@/shared/fonts/chicoreeEm';
import styles from './layout.module.scss';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

const montserratAlt = Montserrat_Alternates({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  variable: '--font-montserrat-alt',
  display: 'swap',
});

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WOW! CRUMBS — печенье, которое ломают ради этого момента',
  description: 'NY cookies с начинкой, наборы и доставка WOW CRUMBS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={classNames(
        montserrat.variable,
        montserratAlt.variable,
        fredoka.variable,
        chicoreeEm.variable,
        styles.html,
      )}
    >
      <body className={styles.body}>{children}</body>
    </html>
  );
}
