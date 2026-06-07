'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowButton } from '@/shared/UI/ArrowButton';
import { usePackagingSlider } from '@/views/home/hooks';
import styles from './PackagingSlider.module.scss';

type PackagingItem = {
  id: string;
  image: string;
  alt: string;
};

type PackagingSliderProps = {
  items: readonly PackagingItem[];
};

export function PackagingSlider({ items }: PackagingSliderProps) {
  const { index, prev, next, goTo } = usePackagingSlider(items.length);
  const touchStartX = useRef<number | null>(null);
  const renderedItems = items.length > 0 ? [...items, ...items] : [];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const centerOffset = isMobile ? 0 : 1;
  const activeIndex = items.length > 0 ? (index + centerOffset) % items.length : 0;

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX ?? null;
    touchStartX.current = null;

    if (startX === null || endX === null) return;

    const deltaX = endX - startX;
    const swipeThreshold = 36;

    if (Math.abs(deltaX) < swipeThreshold) return;
    if (deltaX < 0) {
      next();
      return;
    }
    prev();
  };

  return (
    <div className={styles.slider}>
      <ArrowButton
        direction="left"
        onClick={prev}
        label="Previous packaging"
        className={styles.arrowLeft}
      />

      <div
        className={styles.viewport}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.track}
          style={{
            transform: `translateX(calc(-${index} * ((100% + var(--slide-gap)) / var(--visible-count))))`,
          }}
        >
          {renderedItems.map((item, itemIndex) => {
            const normalizedIndex = items.length > 0 ? itemIndex % items.length : 0;
            const isActive = normalizedIndex === activeIndex;
            const targetIndex =
              items.length > 0
                ? (normalizedIndex - centerOffset + items.length) % items.length
                : 0;

            return (
              <div
                key={`${item.id}-${itemIndex}`}
                className={styles.slide}
                data-active={isActive}
                onClick={() => goTo(targetIndex)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    goTo(targetIndex);
                  }
                }}
              >
                <div className={styles.imageWrap}>
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 348px"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ArrowButton
        direction="right"
        onClick={next}
        label="Next packaging"
        className={styles.arrowRight}
      />
    </div>
  );
}
