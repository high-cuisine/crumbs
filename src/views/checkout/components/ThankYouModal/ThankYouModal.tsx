'use client';

import Link from 'next/link';
import styles from './ThankYouModal.module.scss';

interface ThankYouModalProps {
  onClose: () => void;
}

export function ThankYouModal({ onClose }: ThankYouModalProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <span className={styles.icon}>🍪</span>
        <h2 className={styles.title}>Спасибо за заказ!</h2>
        <p className={styles.text}>
          Мы получили ваш заказ и скоро свяжемся с вами для подтверждения и уточнения деталей доставки.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.primary}>
            На главную
          </Link>
          <button className={styles.secondary} onClick={onClose}>
            Продолжить покупки
          </button>
        </div>
      </div>
    </div>
  );
}
