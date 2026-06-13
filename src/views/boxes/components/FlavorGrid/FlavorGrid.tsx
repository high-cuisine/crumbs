'use client';

import type { Cookie } from '@/server/catalog/schema';
import type { BoxesContent } from '@/server/content/schema';
import { buildCustomSetFromCookies } from '@/shared/cart/buildCustomSet';
import { resolvedSetToCartItem } from '@/shared/cart/types';
import { useCart } from '@/shared/hooks';
import { Container } from '@/shared/UI/Container';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useFlavorSelection } from '@/views/boxes/hooks';
import { FlavorCard } from '../FlavorCard';
import styles from './FlavorGrid.module.scss';

type FlavorGridProps = {
  cookies: Cookie[];
  box: BoxesContent['sets']['mini'];
  cardDoodle: string;
};

export function FlavorGrid({ cookies, box, cardDoodle }: FlavorGridProps) {
  const { quantities, increment, decrement, isFull, total } = useFlavorSelection(
    cookies.map((cookie) => cookie.id),
    box.size,
  );
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = useCallback(() => {
    if (!isFull) return;
    const customSet = buildCustomSetFromCookies({
      name: box.title,
      image: box.mockup,
      price: box.price,
      boxTemplateId: box.id,
      quantities,
      cookies,
    });
    if (!customSet) return;
    addItem(resolvedSetToCartItem(customSet, 'custom', { boxTemplateId: box.id }));
    router.push('/cart');
  }, [addItem, box, cookies, isFull, quantities, router]);

  return (
    <Container className={styles.section}>
      <div className={styles.grid}>
        {cookies.map((cookie) => (
          <FlavorCard
            key={cookie.id}
            name={cookie.name}
            image={cookie.images[0] ?? ''}
            doodle={cardDoodle}
            href={`/flavors/${cookie.id}`}
            quantity={quantities[cookie.id] ?? 0}
            onIncrement={() => increment(cookie.id)}
            onDecrement={() => decrement(cookie.id)}
            incrementDisabled={isFull}
          />
        ))}
      </div>

      <div className={styles.footer}>
        <p className={styles.progress}>
          {total} / {box.size} шт
        </p>
        <button
          type="button"
          className={styles.cart}
          disabled={!isFull}
          onClick={handleAddToCart}
        >
          {`В корзину за ${box.price} ₽`}
        </button>
      </div>
    </Container>
  );
}
