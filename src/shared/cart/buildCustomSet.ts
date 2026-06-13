import type { Cookie, ResolvedCookieSet } from '@/server/catalog/schema';

/** Собрать пользовательский набор из выбранных количеств (без обращения к хранилищу). */
export function buildCustomSetFromCookies(input: {
  name: string;
  image: string;
  price: number;
  boxTemplateId: string;
  quantities: Record<string, number>;
  cookies: Cookie[];
}): ResolvedCookieSet | null {
  const cookieById = new Map(input.cookies.map((c) => [c.id, c]));

  const items = Object.entries(input.quantities)
    .filter(([, qty]) => qty > 0)
    .map(([cookieId, quantity]) => {
      const cookie = cookieById.get(cookieId);
      if (!cookie) return null;
      return { cookie, quantity };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (items.length === 0) return null;

  const cookieCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    id: `custom-${input.boxTemplateId}-${Date.now()}`,
    name: input.name,
    image: input.image,
    price: input.price,
    items,
    cookieCount,
    featured: false,
    orderCount: 0,
    active: true,
    sortOrder: 0,
  };
}
