'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { CartItem } from '@/shared/cart/types';
import styles from './CartSetAccordion.module.scss';

type CartSetAccordionProps = {
  item: CartItem;
  defaultOpen?: boolean;
  onRemove?: (id: string) => void;
};

export function CartSetAccordion({ item, defaultOpen = false, onRemove }: CartSetAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.header}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <div className={styles.media}>
          <Image
            src={item.image}
            alt={item.name.replace(/\n/g, ' ')}
            width={72}
            height={72}
            className={styles.image}
          />
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{item.name.replace(/\n/g, ' ')}</h3>
          <p className={styles.meta}>
            {item.quantity > 1 ? `${item.quantity} × ` : ''}
            {item.cookieCount} шт · {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
          </p>
        </div>
        <span className={styles.chevron} data-open={open} aria-hidden="true" />
      </button>

      {open && (
        <ul className={styles.cookies}>
          {item.items.map(({ cookie, quantity }) => (
            <li key={`${item.id}-${cookie.id}`} className={styles.cookieRow}>
              <div className={styles.cookieMedia}>
                <Image
                  src={cookie.images[0] ?? item.image}
                  alt={cookie.name}
                  width={48}
                  height={48}
                  className={styles.cookieImage}
                />
              </div>
              <div className={styles.cookieBody}>
                <p className={styles.cookieName}>{cookie.name}</p>
                <p className={styles.cookieQty}>{quantity} шт.</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {onRemove && (
        <button
          type="button"
          className={styles.remove}
          onClick={() => onRemove(item.id)}
          aria-label="Удалить набор"
        >
          ✕
        </button>
      )}
    </article>
  );
}
