'use client';

import Image from 'next/image';
import type { HomeContent } from '@/server/content/schema';
import { PlayButton } from '@/shared/UI/PlayButton';
import { classNames } from '@/shared/helpers/classNames';
import { useInView } from '@/shared/hooks';
import styles from './PromoMedia.module.scss';

type PromoMediaProps = {
  media: HomeContent['promo']['media'];
};

export function PromoMedia({ media }: PromoMediaProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={classNames(styles.media, inView && styles.in)}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        className={styles.image}
        sizes="(max-width: 768px) 100vw, 457px"
        priority
      />
      <PlayButton className={styles.play} />
    </div>
  );
}
