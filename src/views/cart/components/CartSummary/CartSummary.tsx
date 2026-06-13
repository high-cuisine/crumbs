'use client';

import Link from 'next/link';
import type { CartItem } from '@/shared/cart/types';
import { cartTotal, cartCount } from '@/shared/cart/types';
import styles from './CartSummary.module.scss';

type CartSummaryProps = {
  items: CartItem[];
  checkoutLabel: string;
  checkoutHref: string;
  summaryTitle: string;
  goodsLabel: string;
  deliveryNote: string;
};

export function CartSummary({
  items,
  checkoutLabel,
  checkoutHref,
  summaryTitle,
  goodsLabel,
  deliveryNote,
}: CartSummaryProps) {
  const total = cartTotal(items);
  const count = cartCount(items);
  const word = count === 1 ? 'товар' : count >= 2 && count <= 4 ? 'товара' : 'товаров';

  return (
    <aside className={styles.card}>
      <Link href={checkoutHref} className={styles.checkout}>
        {checkoutLabel}
      </Link>
      <p className={styles.note}>{deliveryNote}</p>

      <div className={styles.divider} />

      <div className={styles.headRow}>
        <span className={styles.headTitle}>{summaryTitle}</span>
        <span className={styles.headCount}>
          {count} {word}
        </span>
      </div>
      <div className={styles.row}>
        <span>
          {goodsLabel} ({count})
        </span>
        <span className={styles.value}>{total.toLocaleString('ru-RU')} ₽</span>
      </div>
    </aside>
  );
}
