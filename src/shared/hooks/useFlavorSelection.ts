'use client';

import { useCallback, useMemo, useState } from 'react';

/**
 * Управляет количеством каждого вкуса в наборе.
 * Суммарное количество ограничено размером набора (maxTotal),
 * поэтому «+» перестаёт добавлять, когда набор укомплектован.
 */
export function useFlavorSelection(ids: readonly string[], maxTotal: number) {
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(ids.map((id) => [id, 0])),
  );

  const total = useMemo(
    () => Object.values(quantities).reduce((sum, value) => sum + value, 0),
    [quantities],
  );

  const increment = useCallback(
    (id: string) => {
      setQuantities((prev) => {
        const current = Object.values(prev).reduce((sum, value) => sum + value, 0);
        if (current >= maxTotal) return prev;
        return { ...prev, [id]: (prev[id] ?? 0) + 1 };
      });
    },
    [maxTotal],
  );

  const decrement = useCallback((id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] ?? 0) - 1),
    }));
  }, []);

  const reset = useCallback(() => {
    setQuantities((prev) => Object.fromEntries(Object.keys(prev).map((id) => [id, 0])));
  }, []);

  return { quantities, total, increment, decrement, reset, isFull: total >= maxTotal };
}
