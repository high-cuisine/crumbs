import Image from 'next/image';
import Link from 'next/link';
import type { CommonContent } from '@/server/content/schema';
import { Icon } from '@/shared/UI/Icon';
import { NavLink } from '@/shared/UI/NavLink';
import { PhoneLink } from '@/shared/UI/PhoneLink';
import { classNames } from '@/shared/helpers/classNames';
import { MobileMenuDecor } from './MobileMenuDecor';
import styles from './MobileMenu.module.scss';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  site: CommonContent['site'];
  nav: CommonContent['nav'];
  socials: CommonContent['socials'];
  logo: CommonContent['header']['logo'];
};

export function MobileMenu({
  isOpen,
  onClose,
  activeSection,
  site,
  nav,
  socials,
  logo,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Menu">
      <MobileMenuDecor />

      <div className={styles.top}>
        <Link href="/" className={styles.logo} aria-label={site.name} onClick={onClose}>
          <Image src={logo.src} alt={logo.alt} width={151} height={76} priority />
        </Link>

        <button type="button" className={styles.close} aria-label="Close menu" onClick={onClose}>
          <span className={styles.closeIcon} aria-hidden="true">
            <span className={styles.line} />
            <span className={styles.line} />
            <span className={styles.line} />
          </span>
        </button>
      </div>

      <nav className={styles.nav} aria-label="Mobile navigation">
        {nav.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <NavLink
              key={item.id}
              href={item.href}
              active={isActive}
              className={classNames(styles.link, isActive && styles.linkActive)}
              onClick={onClose}
            >
              {item.id === 'hits' && <Icon name="fire" size={22} className={styles.fire} />}
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className={styles.socials}>
        <Link href="/cart" className={styles.cart} aria-label="Cart" onClick={onClose}>
          <Icon name="cart" size={30} />
        </Link>
        <Link href={socials.vk} className={styles.social} aria-label="VK">
          <Icon name="vk" size={18} />
        </Link>
        <Link href={socials.telegram} className={styles.social} aria-label="Telegram">
          <Icon name="telegram" size={22} />
        </Link>
      </div>

      <PhoneLink phone={site.phone} href={site.phoneHref} className={styles.phone} />
    </div>
  );
}
