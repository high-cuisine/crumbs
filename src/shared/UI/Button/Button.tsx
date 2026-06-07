import { classNames } from '@/shared/helpers/classNames';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'md' | 'lg';

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  href,
  type = 'button',
  onClick,
}: ButtonProps) {
  const classes = classNames(
    styles.button,
    styles[variant],
    styles[size],
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
