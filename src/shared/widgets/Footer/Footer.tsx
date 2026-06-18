import Link from 'next/link';
import type { CommonContent } from '@/server/content/schema';
import { Container } from '@/shared/UI/Container';
import styles from './Footer.module.scss';

type FooterProps = {
  common: CommonContent;
};

export function Footer({ common }: FooterProps) {
  const { site, socials, footer } = common;

  return (
    <footer className={styles.footer}>
      <img src={footer.decorLeft} alt="" className={styles.decorLeft} aria-hidden="true" />
      <img src={footer.decorRight} alt="" className={styles.decorRight} aria-hidden="true" />

      <Container className={styles.inner}>
        <h2 className={styles.title}>{footer.title}</h2>

        <a href={site.phoneHref} className={styles.phone}>
          <span
            className={styles.phoneIcon}
            style={{ '--mask-url': `url(${footer.phoneIcon})` } as React.CSSProperties}
            aria-hidden="true"
          />
          <span className={styles.phoneText}>{site.phone}</span>
        </a>

        <p className={styles.mail}>{footer.mailText}</p>
        <p className={styles.address}>{footer.addressText}</p>

        <div className={styles.socials}>
          <Link href={socials.vk} className={styles.socialLink} aria-label="VK">
            <span
              className={styles.socialIcon}
              style={{ '--mask-url': `url(${footer.vkIcon})` } as React.CSSProperties}
              aria-hidden="true"
            />
          </Link>
          <Link href={socials.telegram} className={styles.socialLink} aria-label="Telegram">
            <span
              className={styles.socialIcon}
              style={{ '--mask-url': `url(${footer.telegramIcon})` } as React.CSSProperties}
              aria-hidden="true"
            />
          </Link>
        </div>
      </Container>
    </footer>
  );
}
