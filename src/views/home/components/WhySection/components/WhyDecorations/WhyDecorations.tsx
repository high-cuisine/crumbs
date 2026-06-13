'use client';

import Image from 'next/image';
import { classNames } from '@/shared/helpers/classNames';
import { useInView } from '@/shared/hooks';
import styles from './WhyDecorations.module.scss';

type WhyDecorationsProps = {
  hook: string;
  squiggleLeft: string;
  squiggleRight: string;
};

export function WhyDecorations({ hook, squiggleLeft, squiggleRight }: WhyDecorationsProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={classNames(styles.decorations, inView && styles.in)}
      aria-hidden="true"
    >
      <Image src={hook} alt="" width={123} height={145} className={styles.hook} />
      <Image src={squiggleLeft} alt="" width={73} height={62} className={styles.squiggleLeft} />
      <Image src={squiggleRight} alt="" width={85} height={59} className={styles.squiggleRight} />
    </div>
  );
}
