import { HITS_PAGE_ASSETS } from './hitsPageAssets';

export const HITS_PAGE = {
  title: 'ХИТЫ WOW! CRUMBS',
  subtitle:
    'Начните со вкусов, которые заказывают чаще всего — идеальный вариант для первого знакомства',
  banner: HITS_PAGE_ASSETS.banner,
  bannerAlt: 'Хиты WOW! CRUMBS',
  bottomText: 'Идеальный выбор для первого заказа.',
  buyLabel: 'Добавить в корзину',
  buyHref: '/cart',
} as const;

export const HITS_PAGE_PRODUCTS = [
  { id: 'salted', name: 'Salted Toffee\nCrunch', image: HITS_PAGE_ASSETS.productSalted },
  { id: 'ferrero', name: 'Ferrero Core', image: HITS_PAGE_ASSETS.productFerrero },
  { id: 'pistachio', name: 'Pistachio\nBerry Melt', image: HITS_PAGE_ASSETS.productPistachio },
  { id: 'lemon', name: 'Lemon Berry\nBliss', image: HITS_PAGE_ASSETS.productLemon },
] as const;
