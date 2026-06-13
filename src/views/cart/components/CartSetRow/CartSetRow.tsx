'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CartItem } from '@/shared/cart/types';
import { Icon } from '@/shared/UI/Icon';
import { useFavorites } from '@/shared/hooks';
import { useCartSetRow } from '@/views/cart/hooks';
import { SetCookieList } from './components/SetCookieList';
import styles from './CartSetRow.module.scss';

type CartSetRowProps = {
  item: CartItem;
  buyLabel: string;
  buyHref: string;
  defaultOpen?: boolean;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
};

export function CartSetRow({
  item,
  buyLabel,
  buyHref,
  defaultOpen = false,
  onRemove,
  onQuantityChange,
}: CartSetRowProps) {
  const { open, toggleOpen } = useCartSetRow(defaultOpen);
  const { isFavorite, toggleFavorite } = useFavorites();
  const favKey = item.setId ?? item.id;
  const fav = isFavorite(favKey);
  const name = item.name.replace(/\n/g, ' ');
  const summary = item.items.map(({ cookie }) => cookie.name).join(', ');

  return (
    <article className={styles.row} data-open={open}>
      <button type="button" className={styles.media} onClick={toggleOpen} aria-expanded={open}>
        <Image src={item.image} alt={name} width={132} height={88} className={styles.image} />
      </button>

      <div className={styles.body}>
        <button type="button" className={styles.titleBtn} onClick={toggleOpen} aria-expanded={open}>
          <span className={styles.title}>{name} — {item.cookieCount} шт.</span>
          <span className={styles.chevron} data-open={open} aria-hidden="true" />
        </button>
        <p className={styles.summary}>{summary}</p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => toggleFavorite(favKey)}
            aria-pressed={fav}
            aria-label={fav ? 'Убрать из избранного' : 'В избранное'}
          >
            <Icon name={fav ? 'heart-filled' : 'heart'} size={22} />
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => onRemove(item.id)}
            aria-label="Удалить набор"
          >
            <Icon name="trash" size={22} />
          </button>
          <Link href={buyHref} className={styles.buy}>
            {buyLabel}
          </Link>
        </div>

        {open && <SetCookieList items={item.items} fallbackImage={item.image} />}
      </div>

      <div className={styles.aside}>
        <p className={styles.price}>
          {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
          <Icon name="cart" size={18} className={styles.priceIcon} />
        </p>
        <div className={styles.stepper}>
          <button
            type="button"
            className={styles.stepBtn}
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            aria-label="Уменьшить количество"
          >
            −
          </button>
          <span className={styles.count}>{item.quantity}</span>
          <button
            type="button"
            className={styles.stepBtn}
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            aria-label="Увеличить количество"
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
