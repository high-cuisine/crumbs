import { z } from 'zod';

/** Изображение со смыслом (есть alt). */
export const zImg = z.object({
  src: z.string(),
  alt: z.string().default(''),
});

/** Декоративное изображение — только путь. */
export const zSrc = z.string();

/** Ссылка-кнопка/пункт. */
export const zLink = z.object({
  label: z.string(),
  href: z.string(),
});

// ───────────────────────── common (Header / Footer / контакты) ─────────────────────────

export const zCommon = z.object({
  site: z.object({
    name: z.string(),
    phone: z.string(),
    phoneHref: z.string(),
    email: z.string(),
  }),
  nav: z.array(z.object({ id: z.string(), label: z.string(), href: z.string() })),
  socials: z.object({ vk: z.string(), telegram: z.string() }),
  header: z.object({ logo: zImg }),
  footer: z.object({
    title: z.string(),
    mailText: z.string(),
    addressText: z.string(),
    decorLeft: zSrc,
    decorRight: zSrc,
    phoneIcon: zSrc,
    vkIcon: zSrc,
    telegramIcon: zSrc,
  }),
});

// ───────────────────────── home ─────────────────────────

export const zHome = z.object({
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
    button: zLink,
    cookieMain: zImg,
    cookieSecondary: zSrc,
    scribble: zSrc,
    scribbleTop: zSrc,
    scribbleSecondary: zSrc,
    ring: zSrc,
    blurCircle: zSrc,
    zigzag: zSrc,
    bannerRing: zSrc,
    bgWave: zSrc,
    crumbs: z.array(zSrc),
  }),
  why: z.object({
    title: z.string(),
    body: z.string(),
    gallery: z.array(zImg),
    decorHook: zSrc,
    decorSquiggleLeft: zSrc,
    decorSquiggleRight: zSrc,
  }),
  promo: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    button: zLink,
    media: zImg,
    decorRing: zSrc,
  }),
  hits: z.object({
    title: z.string(),
    button: zLink,
    description: z.array(z.string()),
    products: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        image: zSrc,
        overlayImage: zSrc.optional(),
      }),
    ),
    decorBlobLeft: zSrc,
    decorBlobRight: zSrc,
  }),
  packaging: z.object({
    title: z.string(),
    button: zLink,
    items: z.array(zImg),
  }),
  delivery: z.object({
    title: z.string(),
    paragraphs: z.array(z.string()),
    button: zLink,
    illustration: zImg,
    path: zSrc,
    star: zSrc,
    truckLeft: zSrc,
    truckRight: zSrc,
  }),
  payment: z.object({
    title: z.string(),
    body: z.string(),
    accent: z.string(),
    button: zLink,
    image: zImg,
  }),
});

// ───────────────────────── /hits ─────────────────────────

export const zHits = z.object({
  title: z.string(),
  subtitle: z.string(),
  bottomText: z.string(),
  buyLabel: z.string(),
  buyHref: z.string(),
  banner: zImg,
  bannerDonut: zSrc,
  bannerCat: zSrc,
  products: z.array(z.object({ id: z.string(), name: z.string(), image: zSrc })),
});

// ───────────────────────── /boxes (+ /boxes/mini|signature|party) ─────────────────────────

const zBoxSet = z.object({
  id: z.string(),
  title: z.string(),
  size: z.number(),
  price: z.number(),
  cartLabel: z.string(),
  cartHref: z.string(),
  note: z.string(),
  mockup: zSrc,
  mockupAlt: z.string(),
});

export const zBoxes = z.object({
  constructor: z.object({
    title: z.string(),
    note: z.string(),
    cartLabel: z.string(),
    cartHref: z.string(),
    hero: zImg,
    bannerText: z.string(),
    bannerBlobLeft: zSrc,
    bannerBlobRight: zSrc,
    customNote: z.string().optional(),
    sizes: z.array(
      z.object({ id: z.string(), name: z.string(), image: zSrc, href: z.string() }),
    ),
  }),
  sets: z.object({ mini: zBoxSet, signature: zBoxSet, party: zBoxSet }),
  flavors: z.array(z.object({ id: z.string(), name: z.string(), image: zSrc })),
  cardDoodle: zSrc,
});

// ───────────────────────── /delivery ─────────────────────────

export const zDelivery = z.object({
  title: z.string(),
  formTitle: z.string(),
  removeLabel: z.string(),
  submitLabel: z.string(),
  fields: z.array(z.object({ id: z.string(), label: z.string(), span: z.enum(['full', 'half']) })),
  banner: zImg,
  map: zImg,
  scheduleTitle: z.string().optional(),
  schedule: z.array(z.string()).optional(),
  stepsTitle: z.string().optional(),
  steps: z.array(z.string()).optional(),
});

// ───────────────────────── /cart ─────────────────────────

export const zCart = z.object({
  title: z.string(),
  note: z.string(),
  linkLabel: z.string(),
  linkHref: z.string(),
  /** Заполненная корзина. */
  pageTitle: z.string().default('Корзина'),
  subtitle: z.string().default('Доступность вкусов зависит от партии'),
  ordersTitle: z.string().default('Доступные заказы'),
  buyLabel: z.string().default('Купить'),
  checkoutLabel: z.string().default('Перейти к оформлению'),
  checkoutHref: z.string().default('/checkout'),
  summaryTitle: z.string().default('Ваша корзина'),
  goodsLabel: z.string().default('Товары'),
  deliveryNote: z
    .string()
    .default('Доступные способы и время доставки можно выбрать при оформлении'),
});

// ───────────────────────── реестр ─────────────────────────

export const contentSchema = {
  common: zCommon,
  home: zHome,
  hits: zHits,
  boxes: zBoxes,
  delivery: zDelivery,
  cart: zCart,
} as const;

export type PageKey = keyof typeof contentSchema;

export type CommonContent = z.infer<typeof zCommon>;
export type HomeContent = z.infer<typeof zHome>;
export type HitsContent = z.infer<typeof zHits>;
export type BoxesContent = z.infer<typeof zBoxes>;
export type DeliveryContent = z.infer<typeof zDelivery>;
export type CartContent = z.infer<typeof zCart>;

export type PageContentMap = {
  common: CommonContent;
  home: HomeContent;
  hits: HitsContent;
  boxes: BoxesContent;
  delivery: DeliveryContent;
  cart: CartContent;
};

export const PAGE_KEYS = Object.keys(contentSchema) as PageKey[];
