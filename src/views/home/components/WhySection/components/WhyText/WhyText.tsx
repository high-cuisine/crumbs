'use client';

import { Heading, Text } from '@/shared/UI/Typography';
import { classNames } from '@/shared/helpers/classNames';
import { useInView } from '@/shared/hooks';
import styles from './WhyText.module.scss';

type WhyTextProps = {
  title: string;
  body: string;
};

export function WhyText({ title, body }: WhyTextProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={classNames(styles.textBlock, inView && styles.in)}>
      <Heading as="h2" id="why-title" className={styles.title}>
        {title}
      </Heading>
      <Text as="p" variant="body" className={styles.body}>
        {body}
      </Text>
    </div>
  );
}
