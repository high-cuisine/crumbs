'use client';

import Image from 'next/image';
import type { HomeContent } from '@/server/content/schema';
import { Button } from '@/shared/UI/Button';
import { Container } from '@/shared/UI/Container';
import { Reveal } from '@/shared/UI/Reveal';
import { classNames } from '@/shared/helpers/classNames';
import { useInView } from '@/shared/hooks';
import { DeliveryIllustration } from './components/DeliveryIllustration';
import { DeliveryText } from './components/DeliveryText';
import styles from './DeliverySection.module.scss';

type DeliverySectionProps = {
  data: HomeContent['delivery'];
};

export function DeliverySection({ data }: DeliverySectionProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      id="delivery"
      ref={ref}
      className={classNames(styles.section, inView && styles.in)}
      aria-labelledby="delivery-title"
    >
      <Image
        src={data.path}
        alt=""
        width={1481}
        height={165}
        className={styles.path}
        aria-hidden="true"
      />
      <Image
        src={data.star}
        alt=""
        width={118}
        height={115}
        className={styles.star}
        aria-hidden="true"
      />
      <Container className={styles.inner}>
        <div className={styles.illustration}>
          <DeliveryIllustration illustration={data.illustration} />
        </div>
        <div className={styles.content}>
          <DeliveryText title={data.title} paragraphs={data.paragraphs} />
          <Reveal className={styles.action} direction="up" delay={200}>
            <Button href={data.button.href}>{data.button.label}</Button>
          </Reveal>
        </div>
      </Container>
      <Image
        src={data.truckLeft}
        alt=""
        width={126}
        height={225}
        className={styles.truckLeft}
        aria-hidden="true"
      />
      <Image
        src={data.truckRight}
        alt=""
        width={147}
        height={272}
        className={styles.truckRight}
        aria-hidden="true"
      />
    </section>
  );
}
