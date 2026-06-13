import type { Metadata } from 'next';
import Link from 'next/link';
import { ADMIN_SECTIONS, sectionTitle } from '@/views/admin/helpers/fields';
import { logoutAction } from '../login/actions';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'Админка WOW! CRUMBS',
  robots: { index: false, follow: false },
};

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link href="/admin" className={styles.brand}>
          WOW! CRUMBS
          <span className={styles.brandSub}>управление сайтом</span>
        </Link>

        <nav className={styles.nav}>
          {ADMIN_SECTIONS.map((section) => (
            <Link key={section} href={`/admin/${section}`} className={styles.navLink}>
              {sectionTitle(section)}
            </Link>
          ))}
          <Link href="/admin/orders" className={styles.navLink}>Заказы</Link>
          <Link href="/admin/settings" className={styles.navLink}>Настройки</Link>
        </nav>

        <div className={styles.bottom}>
          <Link href="/" className={styles.siteLink} target="_blank">
            Открыть сайт ↗
          </Link>
          <form action={logoutAction}>
            <button type="submit" className={styles.logout}>
              Выйти
            </button>
          </form>
        </div>
      </aside>

      <main className={styles.content}>{children}</main>
    </div>
  );
}
