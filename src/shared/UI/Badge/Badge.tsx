import { classNames } from '@/shared/helpers/classNames';
import styles from './Badge.module.scss';

type BadgeProps = {
  count: number;
  className?: string;
};

export function Badge({ count, className }: BadgeProps) {
  if (count <= 0) return null;

  return (
    <span className={classNames(styles.badge, className)} aria-label={`${count} items`}>
      {count}
    </span>
  );
}
