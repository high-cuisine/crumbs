import { BOXES_ASSETS } from './boxesAssets';

export type BoxId = 'mini' | 'signature' | 'party';

export type BoxSet = {
  id: BoxId;
  title: string;
  size: number;
  cartLabel: string;
  cartHref: string;
  note: string;
  mockup: string;
  mockupAlt: string;
};

export const BOX_SETS: Record<BoxId, BoxSet> = {
  mini: {
    id: 'mini',
    title: 'Mini — 4 шт',
    size: 4,
    cartLabel: 'Перейти в корзину',
    cartHref: '/cart',
    note: 'Вы выбираете вкусы — мы аккуратно соберем ваш набор',
    mockup: BOXES_ASSETS.boxMockup,
    mockupAlt: 'Набор Mini WOW! CRUMBS',
  },
  signature: {
    id: 'signature',
    title: 'Signature — 6 шт',
    size: 6,
    cartLabel: 'Перейти в корзину',
    cartHref: '/cart',
    note: 'Вы выбираете вкусы — мы аккуратно соберем ваш набор',
    mockup: BOXES_ASSETS.boxSignature,
    mockupAlt: 'Набор Signature WOW! CRUMBS',
  },
  party: {
    id: 'party',
    title: 'Party — 12 шт',
    size: 12,
    cartLabel: 'Перейти в корзину',
    cartHref: '/cart',
    note: 'Вы выбираете вкусы — мы аккуратно соберем ваш набор',
    mockup: BOXES_ASSETS.boxParty,
    mockupAlt: 'Набор Party WOW! CRUMBS',
  },
};

// По макету все позиции — «Вишнёвое» (плейсхолдеры под реальный ассортимент).
export const BOX_FLAVORS = Array.from({ length: 6 }, (_, index) => ({
  id: `cherry-${index + 1}`,
  name: 'Вишнёвое',
  image: BOXES_ASSETS.cookieCherry,
})) as ReadonlyArray<{ id: string; name: string; image: string }>;
