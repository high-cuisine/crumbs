import fs from 'node:fs';
import path from 'node:path';
import { parseCookie, parseCookieSet } from '../catalog/parse';
import type { Cookie, CookieSet } from '../catalog/schema';
import { DATA_DIR, ensureDir } from './paths';
import type { AppSettings, ContentStore, MediaRow, OrderRecord, OrderStatus } from './types';

/**
 * JSON-хранилище: фолбэк, когда нативный SQLite недоступен (локальная разработка
 * без собранного better-sqlite3). API идентичен SQLite-адаптеру.
 */
export function createJsonStore(): ContentStore {
  ensureDir(DATA_DIR);
  const contentFile = path.join(DATA_DIR, 'content.json');
  const mediaFile = path.join(DATA_DIR, 'media.json');
  const cookiesFile = path.join(DATA_DIR, 'cookies.json');
  const setsFile = path.join(DATA_DIR, 'sets.json');
  const ordersFile = path.join(DATA_DIR, 'orders.json');

  function readJson<T>(file: string, fallback: T): T {
    try {
      return JSON.parse(fs.readFileSync(file, 'utf-8')) as T;
    } catch {
      return fallback;
    }
  }

  function writeJson(file: string, value: unknown): void {
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(value, null, 2), 'utf-8');
    fs.renameSync(tmp, file);
  }

  return {
    kind: 'json',

    getContent(pageKey) {
      const all = readJson<Record<string, string>>(contentFile, {});
      return all[pageKey] ?? null;
    },

    setContent(pageKey, json) {
      const all = readJson<Record<string, string>>(contentFile, {});
      all[pageKey] = json;
      writeJson(contentFile, all);
    },

    listMedia() {
      const all = readJson<MediaRow[]>(mediaFile, []);
      return [...all].sort((a, b) => b.createdAt - a.createdAt);
    },

    insertMedia(row) {
      const all = readJson<MediaRow[]>(mediaFile, []);
      all.push(row);
      writeJson(mediaFile, all);
    },

    listCookies() {
      const all = readJson<Cookie[]>(cookiesFile, []);
      return all.map((raw) => parseCookie(raw)).filter((c): c is Cookie => c !== null);
    },

    getCookie(id) {
      return this.listCookies().find((c) => c.id === id) ?? null;
    },

    upsertCookie(cookie) {
      const all = readJson<Cookie[]>(cookiesFile, []);
      const index = all.findIndex((c) => c.id === cookie.id);
      if (index >= 0) all[index] = cookie;
      else all.push(cookie);
      writeJson(cookiesFile, all);
    },

    deleteCookie(id) {
      const all = readJson<Cookie[]>(cookiesFile, []);
      writeJson(
        cookiesFile,
        all.filter((c) => c.id !== id),
      );
    },

    listSets() {
      const all = readJson<CookieSet[]>(setsFile, []);
      return all.map((raw) => parseCookieSet(raw)).filter((s): s is CookieSet => s !== null);
    },

    getSet(id) {
      return this.listSets().find((s) => s.id === id) ?? null;
    },

    upsertSet(set) {
      const all = readJson<CookieSet[]>(setsFile, []);
      const index = all.findIndex((s) => s.id === set.id);
      if (index >= 0) all[index] = set;
      else all.push(set);
      writeJson(setsFile, all);
    },

    deleteSet(id) {
      const all = readJson<CookieSet[]>(setsFile, []);
      writeJson(
        setsFile,
        all.filter((s) => s.id !== id),
      );
    },

    incrementSetOrderCount(id) {
      const current = this.getSet(id);
      if (!current) return;
      this.upsertSet({ ...current, orderCount: current.orderCount + 1 });
    },

    listOrders() {
      const all = readJson<OrderRecord[]>(ordersFile, []);
      return [...all].sort((a, b) => b.createdAt - a.createdAt);
    },

    saveOrder(data) {
      const all = readJson<OrderRecord[]>(ordersFile, []);
      const record: OrderRecord = {
        id: 'ord_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
        createdAt: Date.now(),
        ...data,
      };
      all.push(record);
      writeJson(ordersFile, all);
      return record;
    },

    updateOrderStatus(id, status: OrderStatus) {
      const all = readJson<OrderRecord[]>(ordersFile, []);
      const index = all.findIndex((o) => o.id === id);
      if (index >= 0) {
        all[index] = { ...all[index], status };
        writeJson(ordersFile, all);
      }
    },

    getSettings() {
      const all = readJson<Record<string, string>>(contentFile, {});
      const raw = all['__settings__'];
      if (!raw) return { telegramRecipients: [] };
      try {
        const parsed = JSON.parse(raw) as Partial<AppSettings>;
        return {
          telegramRecipients: parsed.telegramRecipients ?? [],
        };
      } catch {
        return { telegramRecipients: [] };
      }
    },

    saveSettings(settings: AppSettings) {
      const all = readJson<Record<string, string>>(contentFile, {});
      all['__settings__'] = JSON.stringify(settings);
      writeJson(contentFile, all);
    },
  };
}
