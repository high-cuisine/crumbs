import { classNames } from '@/shared/helpers/classNames';
import styles from './Typography.module.scss';

type HeadingProps = {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  variant?: 'display' | 'section' | 'subsection';
  className?: string;
  color?: 'default' | 'dark' | 'white' | 'accent';
  id?: string;
};

export function Heading({
  children,
  as: Tag = 'h2',
  variant = 'section',
  className,
  color = 'default',
  id,
}: HeadingProps) {
  return (
    <Tag
      id={id}
      className={classNames(
        styles.heading,
        styles[variant],
        styles[`color-${color}`],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

type TextProps = {
  children: React.ReactNode;
  as?: 'p' | 'span' | 'div' | 'h2' | 'h3';
  variant?: 'body' | 'bodyAlt' | 'caption' | 'nav';
  className?: string;
  color?: 'default' | 'dark' | 'muted' | 'white';
  id?: string;
};

export function Text({
  children,
  as: Tag = 'p',
  variant = 'body',
  className,
  color = 'default',
  id,
}: TextProps) {
  return (
    <Tag
      id={id}
      className={classNames(
        styles.text,
        styles[variant],
        styles[`color-${color}`],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
