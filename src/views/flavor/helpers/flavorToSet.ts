import type { Cookie, ResolvedCookieSet } from '@/server/catalog/schema';

/** Один вкус как набор из одного печенья — чтобы положить в корзину. */
export function flavorToSet(cookie: Cookie): ResolvedCookieSet {
  return {
    id: cookie.id,
    name: cookie.name,
    image: cookie.images[0],
    price: cookie.price,
    items: [{ cookie, quantity: 1 }],
    cookieCount: 1,
    featured: false,
    orderCount: 0,
    active: true,
    sortOrder: 0,
  };
}
