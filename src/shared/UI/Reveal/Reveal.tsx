'use client';

import { classNames } from '@/shared/helpers/classNames';
import { useInView } from '@/shared/hooks';
import styles from './Reveal.module.scss';

type RevealDirection = 'up' | 'left' | 'right' | 'scale';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
  /** Задержка появления, мс */
  delay?: number;
  /** Анимировать каждый раз при входе во вьюпорт */
  repeat?: boolean;
};

export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  repeat = false,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: !repeat });

  return (
    <div
      ref={ref}
      className={classNames(styles.reveal, styles[direction], inView && styles.in, className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
