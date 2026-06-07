import { Heading } from '@/shared/UI/Typography';
import { classNames } from '@/shared/helpers/classNames';
import styles from './SectionTitle.module.scss';

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center';
};

export function SectionTitle({
  children,
  className,
  align = 'left',
}: SectionTitleProps) {
  return (
    <Heading
      as="h2"
      variant="section"
      className={classNames(styles.title, styles[align], className)}
    >
      {children}
    </Heading>
  );
}
