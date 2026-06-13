import { createJsonStore } from './jsonStore';
import { createSqliteStore } from './sqliteStore';
import type { ContentStore } from './types';

export type { ContentStore, MediaRow } from './types';

let store: ContentStore | undefined;

/**
 * Singleton-хранилище. Пытается поднять SQLite (better-sqlite3); если нативный
 * модуль недоступен (локально без сборки) — переходит на JSON-файл.
 */
export function getStore(): ContentStore {
  if (store) return store;

  try {
    store = createSqliteStore();
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      const message = error instanceof Error ? error.message.split('\n')[0] : String(error);
      console.warn(`[cms] SQLite недоступен (${message}); используется JSON-хранилище.`);
    }
    store = createJsonStore();
  }

  return store;
}
