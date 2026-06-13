'use client';

import { Fragment } from 'react';
import { classNames } from '@/shared/helpers/classNames';
import { useInView } from '@/shared/hooks';
import styles from './PaymentText.module.scss';

type PaymentTextProps = {
  title: string;
  body: string;
  accent: string;
};

export function PaymentText({ title, body, accent }: PaymentTextProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const lines = body.split('\n');

  return (
    <div ref={ref} className={classNames(styles.text, inView && styles.in)}>
      <h2 id="payment-title" className={styles.title}>
        {title}
      </h2>
      <p className={styles.body}>
        {lines.map((line, index) => (
          <Fragment key={index}>
            {line}
            {index < lines.length - 1 ? <br /> : null}
          </Fragment>
        ))}
      </p>
      <p className={styles.accent}>{accent}</p>
    </div>
  );
}
