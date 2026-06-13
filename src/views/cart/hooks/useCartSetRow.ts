'use client';

import { useCallback, useState } from 'react';

/** Локальное состояние строки набора в корзине: раскрытие состава. */
export function useCartSetRow(defaultOpen = false) {
  const [open, setOpen] = useState(defaultOpen);

  const toggleOpen = useCallback(() => setOpen((value) => !value), []);

  return { open, toggleOpen };
}
