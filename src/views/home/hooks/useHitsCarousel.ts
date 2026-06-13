'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';

type Item = { id: string };

const VISIBLE = 2;
const GAP = 14;
const SWIPE_THRESHOLD = 40;

/**
 * Infinite (cyclic) carousel showing VISIBLE cards at a time.
 *
 * The rendered list clones VISIBLE items on each side so that sliding past
 * either edge lands on a clone; once the transition ends we silently jump to
 * the matching real slide, giving a seamless wrap in both directions.
 */
export function useHitsCarousel<T extends Item>(items: readonly T[]) {
  const count = items.length;
  const viewportRef = useRef<HTMLDivElement>(null);

  const [cardWidth, setCardWidth] = useState(0);
  const [pos, setPos] = useState(VISIBLE);
  const [animate, setAnimate] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const slides = useMemo(() => {
    if (count === 0) return [];
    const head = items.slice(count - VISIBLE);
    const tail = items.slice(0, VISIBLE);
    return [...head, ...items, ...tail].map((item, index) => ({
      item,
      key: `${item.id}-${index}`,
    }));
  }, [items, count]);

  useEffect(() => {
    const measure = () => {
      const width = viewportRef.current?.clientWidth ?? 0;
      if (width > 0) setCardWidth((width - GAP * (VISIBLE - 1)) / VISIBLE);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const next = useCallback(() => {
    if (count <= VISIBLE) return;
    setAnimate(true);
    setPos((current) => current + 1);
  }, [count]);

  const prev = useCallback(() => {
    if (count <= VISIBLE) return;
    setAnimate(true);
    setPos((current) => current - 1);
  }, [count]);

  const onTransitionEnd = useCallback(() => {
    setPos((current) => {
      if (current >= count + VISIBLE) {
        setAnimate(false);
        return current - count;
      }
      if (current < VISIBLE) {
        setAnimate(false);
        return current + count;
      }
      return current;
    });
  }, [count]);

  // Re-enable the transition on the frame after a silent wrap jump.
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, [animate, pos]);

  const onTouchStart = useCallback((event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const delta = event.changedTouches[0].clientX - touchStartX.current;
      touchStartX.current = null;
      if (delta <= -SWIPE_THRESHOLD) next();
      else if (delta >= SWIPE_THRESHOLD) prev();
    },
    [next, prev],
  );

  const step = cardWidth + GAP;
  const trackStyle: CSSProperties = {
    transform: `translate3d(-${pos * step}px, 0, 0)`,
    transition: animate ? 'transform 0.4s ease' : 'none',
    ['--hits-card-width' as string]: `${cardWidth}px`,
  };

  return {
    viewportRef,
    trackStyle,
    slides,
    next,
    prev,
    onTransitionEnd,
    onTouchStart,
    onTouchEnd,
  };
}
