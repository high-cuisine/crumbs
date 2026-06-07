'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/shared/UI/Badge';
import { Container } from '@/shared/UI/Container';
import { Icon } from '@/shared/UI/Icon';
import { NavLink } from '@/shared/UI/NavLink';
import { PhoneLink } from '@/shared/UI/PhoneLink';
import { NAV_ITEMS, SITE } from '@/views/home/helpers';
import { useActiveSection } from '@/views/home/hooks';
import { MobileMenu } from './components/MobileMenu';
import { useMobileMenu } from './hooks';
import styles from './Header.module.scss';

type HeaderProps = {
  cartCount?: number;
};

export function Header({ cartCount = 0 }: HeaderProps) {
  const activeSection = useActiveSection(NAV_ITEMS.map((item) => item.id));
  const { isOpen, toggle, close } = useMobileMenu();

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label={SITE.name}>
          <Image
            src="/images/logo.svg"
            alt={SITE.name}
            width={118}
            height={59}
            priority
            className={styles.logoImage}
          />
        </Link>

        <PhoneLink phone={SITE.phone} href={SITE.phoneHref} className={styles.phone} />

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              href={item.href}
              active={activeSection === item.id}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <button type="button" className={styles.iconButton} aria-label="Cart">
            <Icon name="cart" />
            <Badge count={cartCount} className={styles.badge} />
          </button>
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
          <Icon name="menu" size={28} />
        </button>
      </Container>

      <MobileMenu isOpen={isOpen} onClose={close} activeSection={activeSection} />
    </header>
  );
}
