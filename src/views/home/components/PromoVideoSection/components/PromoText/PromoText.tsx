'use client';

import { classNames } from '@/shared/helpers/classNames';
import { useInView } from '@/shared/hooks';
import styles from './PromoText.module.scss';

type PromoTextProps = {
  title: string;
  subtitle: string;
  description: string;
};

export function PromoText({ title, subtitle, description }: PromoTextProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={classNames(styles.text, inView && styles.in)}>
      <h2 id="promo-title" className={styles.title}>
        {title}
      </h2>
      <p className={styles.body}>
        <strong className={styles.subtitle}>{subtitle}</strong>
        {'\n'}
        {description}
      </p>
    </div>
  );
}
