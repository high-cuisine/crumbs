import Link from 'next/link';
import { ADMIN_SECTIONS, sectionTitle } from '@/views/admin/helpers/fields';
import styles from './page.module.scss';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className={styles.title}>Управление сайтом</h1>
      <p className={styles.subtitle}>
        Выберите раздел, чтобы отредактировать тексты, ссылки и изображения.
      </p>

      <div className={styles.grid}>
        {ADMIN_SECTIONS.map((section) => (
          <Link key={section} href={`/admin/${section}`} className={styles.card}>
            <span className={styles.cardTitle}>{sectionTitle(section)}</span>
            <span className={styles.cardArrow}>→</span>
          </Link>
        ))}
      </div>

      <Link href="/admin/orders" className={styles.card}>
        <span className={styles.cardTitle}>Заказы</span>
        <span className={styles.cardArrow}>→</span>
      </Link>
      <Link href="/admin/settings" className={styles.card}>
        <span className={styles.cardTitle}>Настройки уведомлений</span>
        <span className={styles.cardArrow}>→</span>
      </Link>
    </div>
  );
}
