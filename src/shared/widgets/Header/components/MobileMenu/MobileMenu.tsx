import { NavLink } from '@/shared/UI/NavLink';
import { PhoneLink } from '@/shared/UI/PhoneLink';
import { NAV_ITEMS, SITE } from '@/views/home/helpers';
import styles from './MobileMenu.module.scss';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
};

export function MobileMenu({ isOpen, onClose, activeSection }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <nav
        className={styles.menu}
        aria-label="Mobile navigation"
        onClick={(e) => e.stopPropagation()}
      >
        <PhoneLink phone={SITE.phone} href={SITE.phoneHref} className={styles.phone} />
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            href={item.href}
            active={activeSection === item.id}
            className={styles.link}
            onClick={onClose}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
