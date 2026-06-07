import { Heading } from '@/shared/UI/Typography';
import styles from './PackagingTitle.module.scss';

export function PackagingTitle() {
  return (
    <Heading as="h2" id="packaging-title" variant="subsection" className={styles.title}>
      Идеальный выбор для первого заказа
    </Heading>
  );
}
