'use client';

import { useRouter } from 'next/navigation';
import styles from './BackButton.module.scss';

export function BackButton() {
  const router = useRouter();

  return (
    <button type="button" className={styles.btn} onClick={() => router.back()}>
      <span className={styles.arrow} aria-hidden="true" />
      Назад
    </button>
  );
}
