'use client';

import { useCallback, useState } from 'react';

export function usePackagingSlider(total: number) {
  const [index, setIndex] = useState(0);

  const prev = useCallback(() => {
    if (total <= 1) return;
    setIndex((current) => (current === 0 ? total - 1 : current - 1));
  }, [total]);

  const next = useCallback(() => {
    if (total <= 1) return;
    setIndex((current) => (current === total - 1 ? 0 : current + 1));
  }, [total]);

  const goTo = useCallback(
    (target: number) => {
      if (total <= 1) return;
      const normalized = ((target % total) + total) % total;
      setIndex(normalized);
    },
    [total],
  );

  return { index, prev, next, goTo };
}
