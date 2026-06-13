'use client';

import Image from 'next/image';
import { classNames } from '@/shared/helpers/classNames';
import { useInView } from '@/shared/hooks';
import styles from './HitsDecorations.module.scss';

type HitsDecorationsProps = {
  blobLeft: string;
  blobRight: string;
};

export function HitsDecorations({ blobLeft, blobRight }: HitsDecorationsProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={classNames(styles.decorations, inView && styles.in)}
      aria-hidden="true"
    >
      <Image src={blobLeft} alt="" width={280} height={275} className={styles.blobLeft} />
      <Image src={blobRight} alt="" width={166} height={164} className={styles.blobRight} />
    </div>
  );
}
