'use client';

import Image from 'next/image';
import { classNames } from '@/shared/helpers/classNames';
import { useInView } from '@/shared/hooks';
import styles from './PromoDecorations.module.scss';

type PromoDecorationsProps = {
  ring: string;
};

export function PromoDecorations({ ring }: PromoDecorationsProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={classNames(styles.decorations, inView && styles.in)}
      aria-hidden="true"
    >
      <Image src={ring} alt="" width={132} height={132} className={styles.ring} />
    </div>
  );
}
