import { z } from 'zod';

/** Пищевая ценность на 100 г. */
export const zNutrition = z.object({
  calories: z.number().nonnegative(),
  protein: z.number().nonnegative(),
  fat: z.number().nonnegative(),
  carbs: z.number().nonnegative(),
});

/** Печенье — единица каталога. */
export const zCookie = z.object({
  id: z.string(),
  name: z.string(),
  /** Второе название (латиница/подзаголовок) на странице вкуса. */
  subtitle: z.string().default(''),
  description: z.string().default(''),
  /** Текстура / структура (например «хруст снаружи, тягучее внутри»). */
  structure: z.string().default(''),
  composition: z.string().default(''),
  /** КБЖУ на 100 г — показывается в блоке «Состав». */
  nutrition: zNutrition.optional(),
  price: z.number().int().nonnegative(),
  images: z.array(z.string()).min(1),
  active: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

/** Позиция в наборе — ссылка на печенье и количество. */
export const zSetItem = z.object({
  cookieId: z.string(),
  quantity: z.number().int().positive(),
});

/** Готовый набор из каталога (не пользовательский). */
export const zCookieSet = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  price: z.number().int().nonnegative(),
  items: z.array(zSetItem).min(1),
  /** Показывать на странице «Хиты» (задаётся в админке). */
  featured: z.boolean().default(false),
  /** Счётчик заказов — для сортировки по популярности. */
  orderCount: z.number().int().nonnegative().default(0),
  active: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export type Nutrition = z.infer<typeof zNutrition>;
export type Cookie = z.infer<typeof zCookie>;
export type SetItem = z.infer<typeof zSetItem>;
export type CookieSet = z.infer<typeof zCookieSet>;

export type ResolvedSetItem = {
  cookie: Cookie;
  quantity: number;
};

/** Набор с развёрнутыми данными печенья для фронтенда и корзины. */
export type ResolvedCookieSet = Omit<CookieSet, 'items'> & {
  items: ResolvedSetItem[];
  cookieCount: number;
};
