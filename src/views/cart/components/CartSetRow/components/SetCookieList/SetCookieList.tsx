import Image from 'next/image';
import type { CartSetItem } from '@/shared/cart/types';
import styles from './SetCookieList.module.scss';

type SetCookieListProps = {
  items: CartSetItem[];
  fallbackImage: string;
};

export function SetCookieList({ items, fallbackImage }: SetCookieListProps) {
  return (
    <ul className={styles.list}>
      {items.map(({ cookie, quantity }) => (
        <li key={cookie.id} className={styles.row}>
          <div className={styles.media}>
            <Image
              src={cookie.images[0] ?? fallbackImage}
              alt={cookie.name}
              width={44}
              height={44}
              className={styles.image}
            />
          </div>
          <div className={styles.body}>
            <p className={styles.name}>{cookie.name}</p>
            {cookie.structure && <p className={styles.structure}>{cookie.structure}</p>}
          </div>
          <p className={styles.qty}>
            {quantity} × {cookie.price.toLocaleString('ru-RU')} ₽
          </p>
        </li>
      ))}
    </ul>
  );
}
