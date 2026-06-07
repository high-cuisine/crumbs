import Link from 'next/link';
import { Container } from '@/shared/UI/Container';
import { SITE } from '@/views/home/helpers';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <img
        src="/images/footer/footer-decor-left.svg"
        alt=""
        className={styles.decorLeft}
        aria-hidden="true"
      />
      <img
        src="/images/footer/footer-decor-right.svg"
        alt=""
        className={styles.decorRight}
        aria-hidden="true"
      />

      <Container className={styles.inner}>
        <h2 className={styles.title}>Контактная информация</h2>

        <a href={SITE.phoneHref} className={styles.phone}>
          <img
            src="/images/footer/footer-phone.svg"
            alt=""
            className={styles.phoneIcon}
            aria-hidden="true"
          />
          <span className={styles.phoneText}>{SITE.phone}</span>
        </a>

        <p className={styles.mail}>mail:</p>
        <p className={styles.address}>Адрес</p>

        <div className={styles.socials}>
          <Link href="https://vk.com" className={styles.socialLink} aria-label="VK">
            <img src="/images/footer/footer-vk.svg" alt="" className={styles.socialIcon} aria-hidden="true" />
          </Link>
          <Link href="https://t.me" className={styles.socialLink} aria-label="Telegram">
            <img
              src="/images/footer/footer-telegram.svg"
              alt=""
              className={styles.socialIcon}
              aria-hidden="true"
            />
          </Link>
        </div>
      </Container>
    </footer>
  );
}
