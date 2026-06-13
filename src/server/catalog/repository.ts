import { getStore } from '../store';
import { defaultCookies, defaultSets } from './defaults';
import { parseCookie, parseCookieSet } from './parse';
import { buildCustomSetFromCookies } from '@/shared/cart/buildCustomSet';
import { zCookie, zCookieSet, type Cookie, type CookieSet, type ResolvedCookieSet } from './schema';

function ensureSeeded(): void {
  const store = getStore();
  if (store.listCookies().length === 0) {
    for (const cookie of defaultCookies) store.upsertCookie(cookie);
  }
  if (store.listSets().length === 0) {
    for (const set of defaultSets) store.upsertSet(set);
  }
}

function resolveSet(set: CookieSet, cookies: Map<string, Cookie>): ResolvedCookieSet | null {
  const items = set.items
    .map((item) => {
      const cookie = cookies.get(item.cookieId);
      if (!cookie || !cookie.active) return null;
      return { cookie, quantity: item.quantity };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (items.length === 0) return null;

  return {
    ...set,
    items,
    cookieCount: items.reduce((sum, item) => sum + item.quantity, 0),
  };
}

function cookieMap(cookies: Cookie[]): Map<string, Cookie> {
  return new Map(cookies.map((c) => [c.id, c]));
}

/** Все активные печенья, отсортированные по sortOrder. */
export function listCookies(): Cookie[] {
  ensureSeeded();
  return getStore()
    .listCookies()
    .filter((c) => c.active)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}

/** Все печенья (включая неактивные) — для админки. */
export function listAllCookies(): Cookie[] {
  ensureSeeded();
  return getStore()
    .listCookies()
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}

export function getCookie(id: string): Cookie | null {
  ensureSeeded();
  const cookie = getStore().getCookie(id);
  return cookie?.active ? cookie : null;
}

export function getCookieById(id: string): Cookie | null {
  ensureSeeded();
  return getStore().getCookie(id);
}

export function saveCookie(data: unknown): Cookie {
  const cookie = zCookie.parse(data);
  getStore().upsertCookie(cookie);
  return cookie;
}

export function deleteCookie(id: string): void {
  getStore().deleteCookie(id);
}

/** Все активные наборы с развёрнутым печеньем. */
export function listSets(): ResolvedCookieSet[] {
  ensureSeeded();
  const cookies = cookieMap(getStore().listCookies());
  return getStore()
    .listSets()
    .filter((s) => s.active)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name))
    .map((set) => resolveSet(set, cookies))
    .filter((s): s is ResolvedCookieSet => s !== null);
}

export function listAllSets(): CookieSet[] {
  ensureSeeded();
  return getStore()
    .listSets()
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}

export function getSet(id: string): ResolvedCookieSet | null {
  ensureSeeded();
  const set = getStore().getSet(id);
  if (!set || !set.active) return null;
  const cookies = cookieMap(getStore().listCookies());
  return resolveSet(set, cookies);
}

export function getSetById(id: string): CookieSet | null {
  ensureSeeded();
  return getStore().getSet(id);
}

export function saveSet(data: unknown): CookieSet {
  const set = zCookieSet.parse(data);
  getStore().upsertSet(set);
  return set;
}

export function deleteSet(id: string): void {
  getStore().deleteSet(id);
}

/**
 * Наборы для страницы «Хиты»: сначала featured из админки,
 * затем дополняем самыми популярными (orderCount).
 */
export function listHitSets(limit = 8): ResolvedCookieSet[] {
  const all = listSets();
  const featured = all.filter((s) => s.featured);
  const popular = all
    .filter((s) => !s.featured)
    .sort((a, b) => b.orderCount - a.orderCount);

  const seen = new Set<string>();
  const result: ResolvedCookieSet[] = [];

  for (const set of [...featured, ...popular]) {
    if (seen.has(set.id)) continue;
    seen.add(set.id);
    result.push(set);
    if (result.length >= limit) break;
  }

  return result;
}

export function incrementSetOrderCount(id: string): void {
  getStore().incrementSetOrderCount(id);
}

/** Собрать пользовательский набор из выбранных количеств. */
export function buildCustomSet(input: {
  name: string;
  image: string;
  price: number;
  boxTemplateId: string;
  quantities: Record<string, number>;
}): ResolvedCookieSet | null {
  return buildCustomSetFromCookies({
    ...input,
    cookies: listCookies(),
  });
}

/** Валидация сырых данных из хранилища (миграция / импорт). */
export { parseCookie, parseCookieSet };
