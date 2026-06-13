'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Открытие/закрытие модалки конструктора набора.
 * Хранит id выбранного размера, блокирует прокрутку body и закрывает по Esc.
 */
export function useBoxModal() {
  const [openId, setOpenId] = useState<string | null>(null);

  const open = useCallback((id: string) => setOpenId(id), []);
  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    if (!openId) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openId, close]);

  return { openId, open, close };
}
