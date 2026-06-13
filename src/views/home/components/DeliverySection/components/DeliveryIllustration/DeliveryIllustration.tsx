'use client';

import Image from 'next/image';
import type { HomeContent } from '@/server/content/schema';
import { classNames } from '@/shared/helpers/classNames';
import { useInView } from '@/shared/hooks';
import styles from './DeliveryIllustration.module.scss';

type DeliveryIllustrationProps = {
  illustration: HomeContent['delivery']['illustration'];
};

export function DeliveryIllustration({ illustration }: DeliveryIllustrationProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={classNames(styles.illustration, inView && styles.in)}>
      <Image
        src={illustration.src}
        alt={illustration.alt}
        fill
        className={styles.image}
        sizes="(max-width: 768px) 100vw, 560px"
      />
    </div>
  );
}
