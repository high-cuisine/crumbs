'use client';

import { useCallback, useRef } from 'react';
import { ArrowButton } from '@/shared/UI/ArrowButton';
import { HitsProductItem } from '../HitsProductItem';
import styles from './HitsCarousel.module.scss';

type Product = {
  id: string;
  name: string;
  image: string;
  overlayImage?: string;
};

type HitsCarouselProps = {
  products: readonly Product[];
};

export function HitsCarousel({ products }: HitsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstElementChild?.clientWidth ?? 160;
    const gap = 16;
    track.scrollBy({
      left: direction === 'left' ? -(cardWidth + gap) : cardWidth + gap,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className={styles.carousel}>
      <ArrowButton
        direction="left"
        onClick={() => scroll('left')}
        label="Previous product"
        className={styles.arrowLeft}
      />
      <div ref={trackRef} className={styles.track}>
        {products.map((product) => (
          <HitsProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            overlayImage={product.overlayImage}
            variant="mobile"
          />
        ))}
      </div>
      <ArrowButton
        direction="right"
        onClick={() => scroll('right')}
        label="Next product"
        className={styles.arrowRight}
      />
    </div>
  );
}
