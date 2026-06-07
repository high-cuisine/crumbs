import { classNames } from '@/shared/helpers/classNames';
import styles from './ArrowButton.module.scss';

type ArrowButtonProps = {
  direction: 'left' | 'right';
  onClick: () => void;
  className?: string;
  label: string;
};

export function ArrowButton({
  direction,
  onClick,
  className,
  label,
}: ArrowButtonProps) {
  return (
    <button
      type="button"
      className={classNames(styles.button, className)}
      onClick={onClick}
      aria-label={label}
    >
      <svg
        className={classNames(styles.icon, direction === 'right' && styles.iconRight)}
        width="17"
        height="91"
        viewBox="0 0 17 91"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M15.0488 1.00049L1.04883 40.5821L15.0488 89.7179"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
