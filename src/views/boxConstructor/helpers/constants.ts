import { CONSTRUCTOR_ASSETS } from './constructorAssets';

export const CONSTRUCTOR = {
  title: 'Собрать набор',
  note: 'Вы выбираете вкусы — мы аккуратно соберем ваш набор',
  cartLabel: 'Перейти в корзину',
  cartHref: '/cart',
  hero: CONSTRUCTOR_ASSETS.hero,
  heroAlt: 'Набор печенья WOW! CRUMBS',
  bannerText: 'Идеальный выбор для первого заказа',
} as const;

// Пастельные фоны карточек вкусов в модалке — циклически по индексу.
export const FLAVOR_COLORS = ['#ffb7d2', '#ff9984', '#e3b5ea', '#fb97f5'] as const;

export const BOX_SIZES = [
  {
    id: 'mini',
    name: 'Mini — 4 шт',
    image: CONSTRUCTOR_ASSETS.sizeMini,
    href: '/boxes/mini',
  },
  {
    id: 'signature',
    name: 'Signature — 6 шт',
    image: CONSTRUCTOR_ASSETS.sizeSignature,
    href: '/boxes/signature',
  },
  {
    id: 'party',
    name: 'Party — 12 шт',
    image: CONSTRUCTOR_ASSETS.sizeParty,
    href: '/boxes/party',
  },
] as const;
