'use client';

import type { ResolvedCookieSet } from '@/server/catalog/schema';
import { resolvedSetToCartItem } from '@/shared/cart/types';
import { useCart } from '@/shared/hooks';
import { Button } from '@/shared/UI/Button';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

type AddSetToCartButtonProps = {
  set: ResolvedCookieSet;
  label: string;
  className?: string;
  redirectToCart?: boolean;
};

export function AddSetToCartButton({
  set,
  label,
  className,
  redirectToCart = true,
}: AddSetToCartButtonProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const handleClick = useCallback(() => {
    addItem(resolvedSetToCartItem(set, 'preset'));
    setAdded(true);
    if (redirectToCart) {
      router.push('/cart');
    }
  }, [addItem, redirectToCart, router, set]);

  return (
    <Button type="button" className={className} onClick={handleClick}>
      {added && !redirectToCart ? 'Добавлено' : label}
    </Button>
  );
}
