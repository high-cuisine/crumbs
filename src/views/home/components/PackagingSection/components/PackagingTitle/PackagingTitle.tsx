import { Heading } from '@/shared/UI/Typography';
import styles from './PackagingTitle.module.scss';

type PackagingTitleProps = {
  title: string;
};

export function PackagingTitle({ title }: PackagingTitleProps) {
  return (
    <Heading as="h2" id="packaging-title" variant="subsection" className={styles.title}>
      {title}
    </Heading>
  );
}
