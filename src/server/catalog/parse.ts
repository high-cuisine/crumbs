import { zCookie, zCookieSet, type Cookie, type CookieSet } from './schema';

export function parseCookie(raw: unknown): Cookie | null {
  const parsed = zCookie.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

export function parseCookieSet(raw: unknown): CookieSet | null {
  const parsed = zCookieSet.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

export function parseCookies(rows: unknown[]): Cookie[] {
  return rows.map(parseCookie).filter((c): c is Cookie => c !== null);
}

export function parseCookieSets(rows: unknown[]): CookieSet[] {
  return rows.map(parseCookieSet).filter((s): s is CookieSet => s !== null);
}
