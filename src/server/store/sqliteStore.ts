import path from 'node:path';
import { createRequire } from 'node:module';
import { parseCookie, parseCookieSet } from '../catalog/parse';
import type { Cookie, CookieSet } from '../catalog/schema';
import { DATA_DIR, ensureDir } from './paths';
import type { ContentStore, MediaRow, OrderRecord, OrderStatus, AppSettings } from './types';

// Минимальный тип нативного драйвера, чтобы не зависеть от @types/better-sqlite3
// при локальной сборке (в Docker модуль присутствует целиком).
type Statement = {
  run: (...args: unknown[]) => unknown;
  get: (...args: unknown[]) => unknown;
  all: (...args: unknown[]) => unknown[];
};
type Database = {
  prepare: (sql: string) => Statement;
  exec: (sql: string) => void;
  pragma: (source: string) => unknown;
};
type DatabaseCtor = new (filename: string) => Database;

/**
 * Создаёт SQLite-хранилище. Бросает исключение, если нативный модуль
 * better-sqlite3 не установлен/не собран — вызывающий код перейдёт на JSON-фолбэк.
 */
export function createSqliteStore(): ContentStore {
  // Специфайер вычисляется из env (с дефолтом), чтобы бандлер (Turbopack) не
  // разрешал нативный модуль статически и оставил его динамическим require.
  // Локально модуль может отсутствовать — тогда вызывающий код перейдёт на JSON.
  const require = createRequire(import.meta.url);
  const moduleName = process.env.WC_SQLITE_MODULE ?? ['better', 'sqlite3'].join('-');
  const Database = require(moduleName) as DatabaseCtor;

  ensureDir(DATA_DIR);
  const db = new Database(path.join(DATA_DIR, 'content.db'));
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS content (
      page_key   TEXT PRIMARY KEY,
      data       TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS media (
      id            TEXT PRIMARY KEY,
      filename      TEXT NOT NULL,
      original_name TEXT NOT NULL,
      mime          TEXT NOT NULL,
      size          INTEGER NOT NULL,
      width         INTEGER,
      height        INTEGER,
      url           TEXT NOT NULL,
      created_at    INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS cookies (
      id          TEXT PRIMARY KEY,
      data        TEXT NOT NULL,
      updated_at  INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS cookie_sets (
      id          TEXT PRIMARY KEY,
      data        TEXT NOT NULL,
      updated_at  INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS orders (
      id         TEXT PRIMARY KEY,
      created_at INTEGER NOT NULL,
      customer   TEXT NOT NULL,
      items      TEXT NOT NULL,
      total      INTEGER NOT NULL,
      status     TEXT NOT NULL DEFAULT 'new'
    );
  `);

  return {
    kind: 'sqlite',

    getContent(pageKey) {
      const row = db.prepare('SELECT data FROM content WHERE page_key = ?').get(pageKey) as
        | { data: string }
        | undefined;
      return row?.data ?? null;
    },

    setContent(pageKey, json) {
      db.prepare(
        `INSERT INTO content (page_key, data, updated_at) VALUES (?, ?, ?)
         ON CONFLICT(page_key) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`,
      ).run(pageKey, json, Date.now());
    },

    listMedia() {
      const rows = db
        .prepare('SELECT * FROM media ORDER BY created_at DESC')
        .all() as Array<Record<string, unknown>>;
      return rows.map(mapMediaRow);
    },

    insertMedia(row) {
      db.prepare(
        `INSERT INTO media (id, filename, original_name, mime, size, width, height, url, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ).run(
        row.id,
        row.filename,
        row.originalName,
        row.mime,
        row.size,
        row.width,
        row.height,
        row.url,
        row.createdAt,
      );
    },

    listCookies() {
      const rows = db.prepare('SELECT data FROM cookies').all() as Array<{ data: string }>;
      return rows
        .map((row) => parseCookie(JSON.parse(row.data)))
        .filter((c): c is Cookie => c !== null);
    },

    getCookie(id) {
      const row = db.prepare('SELECT data FROM cookies WHERE id = ?').get(id) as
        | { data: string }
        | undefined;
      if (!row) return null;
      return parseCookie(JSON.parse(row.data));
    },

    upsertCookie(cookie) {
      db.prepare(
        `INSERT INTO cookies (id, data, updated_at) VALUES (?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`,
      ).run(cookie.id, JSON.stringify(cookie), Date.now());
    },

    deleteCookie(id) {
      db.prepare('DELETE FROM cookies WHERE id = ?').run(id);
    },

    listSets() {
      const rows = db.prepare('SELECT data FROM cookie_sets').all() as Array<{ data: string }>;
      return rows
        .map((row) => parseCookieSet(JSON.parse(row.data)))
        .filter((s): s is CookieSet => s !== null);
    },

    getSet(id) {
      const row = db.prepare('SELECT data FROM cookie_sets WHERE id = ?').get(id) as
        | { data: string }
        | undefined;
      if (!row) return null;
      return parseCookieSet(JSON.parse(row.data));
    },

    upsertSet(set) {
      db.prepare(
        `INSERT INTO cookie_sets (id, data, updated_at) VALUES (?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`,
      ).run(set.id, JSON.stringify(set), Date.now());
    },

    deleteSet(id) {
      db.prepare('DELETE FROM cookie_sets WHERE id = ?').run(id);
    },

    incrementSetOrderCount(id) {
      const current = this.getSet(id);
      if (!current) return;
      this.upsertSet({ ...current, orderCount: current.orderCount + 1 });
    },

    listOrders() {
      const rows = db
        .prepare('SELECT * FROM orders ORDER BY created_at DESC')
        .all() as Array<Record<string, unknown>>;
      return rows.map(mapOrderRow);
    },

    saveOrder(data) {
      const id = 'ord_' + Date.now();
      const createdAt = Date.now();
      db.prepare(
        `INSERT INTO orders (id, created_at, customer, items, total, status)
         VALUES (?, ?, ?, ?, ?, ?)`,
      ).run(
        id,
        createdAt,
        JSON.stringify(data.customer),
        JSON.stringify(data.items),
        data.total,
        data.status,
      );
      return { id, createdAt, ...data };
    },

    updateOrderStatus(id, status) {
      db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, id);
    },

    getSettings() {
      const row = db
        .prepare('SELECT data FROM content WHERE page_key = ?')
        .get('__settings__') as { data: string } | undefined;
      if (!row) return { telegramRecipients: [] };
      try {
        const parsed = JSON.parse(row.data) as Partial<AppSettings>;
        return {
          telegramRecipients: parsed.telegramRecipients ?? [],
        };
      } catch {
        return { telegramRecipients: [] };
      }
    },

    saveSettings(settings) {
      db.prepare(
        `INSERT INTO content (page_key, data, updated_at) VALUES (?, ?, ?)
         ON CONFLICT(page_key) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`,
      ).run('__settings__', JSON.stringify(settings), Date.now());
    },
  };
}

function mapMediaRow(r: Record<string, unknown>): MediaRow {
  return {
    id: String(r.id),
    filename: String(r.filename),
    originalName: String(r.original_name),
    mime: String(r.mime),
    size: Number(r.size),
    width: r.width == null ? null : Number(r.width),
    height: r.height == null ? null : Number(r.height),
    url: String(r.url),
    createdAt: Number(r.created_at),
  };
}

function mapOrderRow(r: Record<string, unknown>): OrderRecord {
  return {
    id: String(r.id),
    createdAt: Number(r.created_at),
    customer: JSON.parse(String(r.customer)),
    items: JSON.parse(String(r.items)),
    total: Number(r.total),
    status: String(r.status) as OrderStatus,
  };
}
