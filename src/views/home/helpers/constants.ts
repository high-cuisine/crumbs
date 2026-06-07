import { HITS_ASSETS } from './hitsAssets';

export const SITE = {
  name: 'WOW! CRUMBS',
  phone: '+7 (968) 825 83 05',
  phoneHref: 'tel:+79688258305',
  email: 'mail@wowcrumbs.ru',
} as const;

export const NAV_ITEMS = [
  { label: 'Хиты', href: '#hits', id: 'hits' },
  { label: 'Коробки', href: '#packaging', id: 'packaging' },
  { label: 'Доставка', href: '#delivery', id: 'delivery' },
  { label: 'Оплата', href: '#payment', id: 'payment' },
] as const;

export const HITS_PRODUCTS = [
  {
    id: 'pistachio',
    name: 'Pistachio\nBerry Melt',
    image: HITS_ASSETS.productPistachio,
  },
  {
    id: 'ferrero',
    name: 'Ferrero\nCore',
    image: HITS_ASSETS.productFerrero,
  },
  {
    id: 'lemon',
    name: 'Lemon\nBerry\nBliss',
    image: HITS_ASSETS.productLemon,
  },
  {
    id: 'biscoff',
    name: 'Biscoff\nLava',
    image: HITS_ASSETS.productBiscoff,
    overlayImage: HITS_ASSETS.cookieOverlay,
  },
  {
    id: 'salted',
    name: 'Salted\nToffee\nCrunch',
    image: HITS_ASSETS.productSalted,
  },
] as const;

export const PACKAGING_ITEMS = [
  { id: 'box-1', image: '/images/box-1.png', alt: 'Фирменная коробка WOW CRUMBS' },
  { id: 'box-2', image: '/images/box-2-33f1f0.png', alt: 'Подарочная коробка WOW CRUMBS' },
  { id: 'box-3', image: '/images/box-3-39c788.png', alt: 'Набор печенья WOW CRUMBS' },
] as const;

export const WHY_GALLERY = [
  { id: 'why-1', image: '/images/why/why-1-217953.png', alt: 'Печенье WOW CRUMBS' },
  { id: 'why-2', image: '/images/why/why-2.png', alt: 'Ассортимент печенья' },
  { id: 'why-3', image: '/images/why/why-3.png', alt: 'Печенье с начинкой' },
  { id: 'why-4', image: '/images/why/why-4.png', alt: 'NY cookies' },
] as const;
