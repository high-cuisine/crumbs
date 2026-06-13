import Image from 'next/image';
import Link from 'next/link';
import type { CommonContent } from '@/server/content/schema';
import { Container } from '@/shared/UI/Container';
import styles from './PageHeader.module.scss';

type PageHeaderProps = {
  common: CommonContent;
};

/** Пурпурная шапка внутренних страниц (логотип по центру слева). */
export function PageHeader({ common }: PageHeaderProps) {
  const { site, header } = common;

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label={site.name}>
          <Image
            src={header.logo.src}
            alt={header.logo.alt}
            width={103}
            height={52}
            priority
            className={styles.logoImage}
          />
        </Link>
      </Container>
    </header>
  );
}
