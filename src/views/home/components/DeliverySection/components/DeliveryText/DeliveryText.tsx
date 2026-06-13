'use client';

import { Heading, Text } from '@/shared/UI/Typography';
import { classNames } from '@/shared/helpers/classNames';
import { useInView } from '@/shared/hooks';
import styles from './DeliveryText.module.scss';

type DeliveryTextProps = {
  title: string;
  paragraphs: string[];
};

export function DeliveryText({ title, paragraphs }: DeliveryTextProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={classNames(styles.text, inView && styles.in)}>
      <Heading as="h2" id="delivery-title" variant="section" className={styles.title}>
        {title}
      </Heading>
      {paragraphs.map((paragraph, index) => (
        <Text as="p" key={index} variant="caption" className={styles.paragraph}>
          {paragraph}
        </Text>
      ))}
    </div>
  );
}
