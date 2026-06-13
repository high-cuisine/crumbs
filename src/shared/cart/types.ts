import type { Cookie, ResolvedCookieSet } from '@/server/catalog/schema';

export type CartSetItem = {
  cookie: Cookie;
  quantity: number;
};

/** Элемент корзины — набор с уже вложенным печеньем. */
export type CartItem = {
  id: string;
  kind: 'preset' | 'custom';
  setId?: string;
  boxTemplateId?: string;
  name: string;
  image: string;
  /** Цена за один набор. Итог строки = price × quantity. */
  price: number;
  /** Сколько таких наборов в корзине. */
  quantity: number;
  cookieCount: number;
  items: CartSetItem[];
};

export type CartState = {
  items: CartItem[];
};

export function resolvedSetToCartItem(
  set: ResolvedCookieSet,
  kind: 'preset' | 'custom',
  options?: { boxTemplateId?: string },
): CartItem {
  return {
    id: `${kind}-${set.id}-${crypto.randomUUID()}`,
    kind,
    setId: kind === 'preset' ? set.id : undefined,
    boxTemplateId: options?.boxTemplateId,
    name: set.name,
    image: set.image,
    price: set.price,
    quantity: 1,
    cookieCount: set.cookieCount,
    items: set.items.map((item) => ({ cookie: item.cookie, quantity: item.quantity })),
  };
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/** Общее количество наборов в корзине (с учётом количества каждого). */
export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
