'use client';

import { ArrowButton } from '@/shared/UI/ArrowButton';
import { useHitsCarousel } from '@/views/home/hooks';
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
  const {
    viewportRef,
    trackStyle,
    slides,
    next,
    prev,
    onTransitionEnd,
    onTouchStart,
    onTouchEnd,
  } = useHitsCarousel(products);

  return (
    <div className={styles.carousel}>
      <ArrowButton
        direction="left"
        onClick={prev}
        label="Previous product"
        className={styles.arrowLeft}
      />
      <div className={styles.viewport} ref={viewportRef}>
        <div
          className={styles.track}
          style={trackStyle}
          onTransitionEnd={onTransitionEnd}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {slides.map(({ item, key }) => (
            <HitsProductItem
              key={key}
              id={item.id}
              name={item.name}
              image={item.image}
              overlayImage={item.overlayImage}
              variant="mobile"
            />
          ))}
        </div>
      </div>
      <ArrowButton
        direction="right"
        onClick={next}
        label="Next product"
        className={styles.arrowRight}
      />
    </div>
  );
}
