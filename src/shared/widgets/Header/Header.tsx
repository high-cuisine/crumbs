'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CommonContent } from '@/server/content/schema';
import { Badge } from '@/shared/UI/Badge';
import { Container } from '@/shared/UI/Container';
import { Icon } from '@/shared/UI/Icon';
import { NavLink } from '@/shared/UI/NavLink';
import { PhoneLink } from '@/shared/UI/PhoneLink';
import { useActiveSection } from '@/views/home/hooks';
import { MobileMenu } from './components/MobileMenu';
import { useMobileMenu } from './hooks';
import styles from './Header.module.scss';

type HeaderProps = {
  cartCount?: number;
  common: CommonContent;
};

export function Header({ cartCount = 0, common }: HeaderProps) {
  const { site, nav, socials, header } = common;
  const activeSection = useActiveSection(nav.map((item) => item.id));
  const { isOpen, toggle, close } = useMobileMenu();

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label={site.name}>
          <Image
            src={header.logo.src}
            alt={header.logo.alt}
            width={118}
            height={59}
            priority
            className={styles.logoImage}
          />
        </Link>

        <PhoneLink phone={site.phone} href={site.phoneHref} className={styles.phone} />

        <nav className={styles.nav} aria-label="Main navigation">
          {nav.map((item) => (
            <NavLink key={item.id} href={item.href} active={activeSection === item.id}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="/cart" className={styles.iconButton} aria-label="Cart">
            <Icon name="cart" />
            <Badge count={cartCount} className={styles.badge} />
          </Link>
          <button type="button" className={styles.iconButton} aria-label="Profile">
            <Icon name="user" />
          </button>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-label="Open menu"
          aria-expanded={isOpen}
          onClick={toggle}
        >
          <span className={styles.burger} aria-hidden="true">
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </span>
        </button>
      </Container>

      <MobileMenu
        isOpen={isOpen}
        onClose={close}
        activeSection={activeSection}
        site={site}
        nav={nav}
        socials={socials}
        logo={header.logo}
      />
    </header>
  );
}
