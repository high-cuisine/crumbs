'use client';

import { classNames } from '@/shared/helpers/classNames';
import { useInView } from '@/shared/hooks';
import styles from './HeroContent.module.scss';

type HeroContentProps = {
  title: string;
  subtitle: string;
};

export function HeroContent({ title, subtitle }: HeroContentProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={classNames(styles.content, inView && styles.in)}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
}
