'use client';

import Image from 'next/image';
import { useState } from 'react';
import { classNames } from '@/shared/helpers/classNames';
import styles from './FlavorGallery.module.scss';

type FlavorGalleryProps = {
  images: string[];
  alt: string;
};

export function FlavorGallery({ images, alt }: FlavorGalleryProps) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <Image
          src={main}
          alt={alt}
          fill
          sizes="(max-width: 900px) 100vw, 440px"
          className={styles.mainImage}
          priority
        />
      </div>

      {images.length > 1 && (
        <div className={styles.thumbs}>
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              className={classNames(styles.thumb, index === active && styles.thumbActive)}
              onClick={() => setActive(index)}
              aria-label={`Фото ${index + 1}`}
              aria-pressed={index === active}
            >
              <Image src={src} alt="" fill sizes="140px" className={styles.thumbImage} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
