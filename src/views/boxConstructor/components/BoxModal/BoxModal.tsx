'use client';

import Image from 'next/image';
import type { Cookie } from '@/server/catalog/schema';
import type { BoxesContent } from '@/server/content/schema';
import { buildCustomSetFromCookies } from '@/shared/cart/buildCustomSet';
import { resolvedSetToCartItem } from '@/shared/cart/types';
import { useCart, useFlavorSelection } from '@/shared/hooks';
import { FLAVOR_COLORS } from '@/views/boxConstructor/helpers';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { ModalFlavorCard } from './components/ModalFlavorCard';
import styles from './BoxModal.module.scss';

type BoxModalProps = {
  set: BoxesContent['sets']['mini'];
  cookies: Cookie[];
  cardDoodle: string;
  onClose: () => void;
};

export function BoxModal({ set, cookies, cardDoodle, onClose }: BoxModalProps) {
  const { quantities, increment, decrement, isFull } = useFlavorSelection(
    cookies.map((cookie) => cookie.id),
    set.size,
  );
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = useCallback(() => {
    if (!isFull) return;
    const customSet = buildCustomSetFromCookies({
      name: set.title,
      image: set.mockup,
      price: set.price,
      boxTemplateId: set.id,
      quantities,
      cookies,
    });
    if (!customSet) return;
    addItem(resolvedSetToCartItem(customSet, 'custom', { boxTemplateId: set.id }));
    onClose();
    router.push('/cart');
  }, [addItem, cookies, isFull, onClose, quantities, router, set]);

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={set.title}
      onClick={onClose}
    >
      <div className={styles.panel} onClick={(event) => event.stopPropagation()}>
        <button type="button" className={styles.close} aria-label="Закрыть" onClick={onClose}>
          ✕
        </button>

        <div className={styles.mockup}>
          <Image
            src={set.mockup}
            alt={set.mockupAlt}
            width={520}
            height={360}
            className={styles.mockupImage}
            priority
          />
        </div>

        <div className={styles.config}>
          <span className={styles.badge}>{set.title}</span>

          <div className={styles.grid}>
            {cookies.map((cookie, index) => (
              <ModalFlavorCard
                key={cookie.id}
                name={cookie.name}
                image={cookie.images[0] ?? ''}
                doodle={cardDoodle}
                color={FLAVOR_COLORS[index % FLAVOR_COLORS.length]}
                href={`/flavors/${cookie.id}`}
                quantity={quantities[cookie.id] ?? 0}
                onIncrement={() => increment(cookie.id)}
                onDecrement={() => decrement(cookie.id)}
                incrementDisabled={isFull}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.cart}
            disabled={!isFull}
            onClick={handleAddToCart}
          >
            {`В корзину за ${set.price} ₽`}
          </button>
        </div>
      </div>
    </div>
  );
}
