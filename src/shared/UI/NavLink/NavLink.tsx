import Link from 'next/link';
import { classNames } from '@/shared/helpers/classNames';
import styles from './NavLink.module.scss';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
};

export function NavLink({ href, children, active = false, className, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={classNames(styles.link, active && styles.active, className)}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
