import { classNames } from '@/shared/helpers/classNames';
import styles from './Container.module.scss';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'footer' | 'main';
};

export function Container({
  children,
  className,
  as: Tag = 'div',
}: ContainerProps) {
  return <Tag className={classNames(styles.container, className)}>{children}</Tag>;
}
