'use client';

import { useCallback, useEffect, useState } from 'react';
import type { CartItem, CartState } from '@/shared/cart/types';

const STORAGE_KEY = 'wc_cart';

function readCart(): CartState {
  if (typeof window === 'undefined') return { items: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw) as CartState;
    if (!Array.isArray(parsed.items)) return { items: [] };
    // Нормализуем старые записи без quantity.
    const items = parsed.items.map((item) => ({
      ...item,
      quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1,
    }));
    return { items };
  } catch {
    return { items: [] };
  }
}

function writeCart(state: CartState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent('wc-cart-updated'));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart().items);

    const sync = () => setItems(readCart().items);
    window.addEventListener('wc-cart-updated', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('wc-cart-updated', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const addItem = useCallback((item: CartItem) => {
    const next = { items: [...readCart().items, item] };
    writeCart(next);
    setItems(next.items);
  }, []);

  const removeItem = useCallback((id: string) => {
    const next = { items: readCart().items.filter((item) => item.id !== id) };
    writeCart(next);
    setItems(next.items);
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    const safe = Math.max(1, Math.round(quantity));
    const next = {
      items: readCart().items.map((item) =>
        item.id === id ? { ...item, quantity: safe } : item,
      ),
    };
    writeCart(next);
    setItems(next.items);
  }, []);

  const clear = useCallback(() => {
    writeCart({ items: [] });
    setItems([]);
  }, []);

  return { items, addItem, removeItem, updateQuantity, clear };
}
