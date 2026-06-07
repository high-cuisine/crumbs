import Image from 'next/image';
import { Button } from '@/shared/UI/Button';
import { Container } from '@/shared/UI/Container';
import { DeliveryIllustration } from './components/DeliveryIllustration';
import { DeliveryText } from './components/DeliveryText';
import styles from './DeliverySection.module.scss';

export function DeliverySection() {
  return (
    <section id="delivery" className={styles.section} aria-labelledby="delivery-title">
      <Image
        src="/images/delivery/delivery-path.svg"
        alt=""
        width={1481}
        height={165}
        className={styles.path}
        aria-hidden="true"
      />
      <Image
        src="/images/delivery/delivery-decor-star.svg"
        alt=""
        width={118}
        height={115}
        className={styles.star}
        aria-hidden="true"
      />
      <Container className={styles.inner}>
        <div className={styles.illustration}>
          <DeliveryIllustration />
        </div>
        <div className={styles.content}>
          <DeliveryText />
          <div className={styles.action}>
            <Button href="#payment">Заказать доставку</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
