'use client';

import { classNames } from '@/shared/helpers/classNames';
import { useInView } from '@/shared/hooks';
import styles from './HitsGrid.module.scss';

type HitsGridProps = {
  children: React.ReactNode;
};

export function HitsGrid({ children }: HitsGridProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={classNames(styles.grid, inView && styles.in)}>
      {children}
    </div>
  );
}
