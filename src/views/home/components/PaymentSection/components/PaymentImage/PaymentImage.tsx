'use client';

import Image from 'next/image';
import type { HomeContent } from '@/server/content/schema';
import { classNames } from '@/shared/helpers/classNames';
import { useInView } from '@/shared/hooks';
import styles from './PaymentImage.module.scss';

type PaymentImageProps = {
  image: HomeContent['payment']['image'];
};

export function PaymentImage({ image }: PaymentImageProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={classNames(styles.imageWrap, inView && styles.in)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className={styles.image}
        sizes="(max-width: 768px) 100vw, 335px"
      />
    </div>
  );
}
