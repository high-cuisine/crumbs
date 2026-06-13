'use client';

import Image from 'next/image';
import type { HomeContent } from '@/server/content/schema';
import { classNames } from '@/shared/helpers/classNames';
import { useInView } from '@/shared/hooks';
import styles from './WhyGallery.module.scss';

type WhyGalleryProps = {
  items: HomeContent['why']['gallery'];
};

export function WhyGallery({ items }: WhyGalleryProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={classNames(styles.gallery, inView && styles.in)}>
      {items.map((item, index) => (
        <div key={`${item.src}-${index}`} className={styles.item}>
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 50vw, 255px"
          />
        </div>
      ))}
    </div>
  );
}
