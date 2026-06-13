'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'wc_favorites';
const EVENT = 'wc-favorites-updated';

function readFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function writeFavorites(keys: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
  window.dispatchEvent(new CustomEvent(EVENT));
}

/** Лайки пользователя, сохранённые в localStorage (синхронизируются между вкладками). */
export function useFavorites() {
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    setKeys(readFavorites());

    const sync = () => setKeys(readFavorites());
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const isFavorite = useCallback((key: string) => keys.includes(key), [keys]);

  const toggleFavorite = useCallback((key: string) => {
    const current = readFavorites();
    const next = current.includes(key)
      ? current.filter((k) => k !== key)
      : [...current, key];
    writeFavorites(next);
    setKeys(next);
  }, []);

  return { isFavorite, toggleFavorite };
}
