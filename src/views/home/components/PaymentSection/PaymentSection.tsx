import { Button } from '@/shared/UI/Button';
import { PaymentImage } from './components/PaymentImage';
import { PaymentText } from './components/PaymentText';
import styles from './PaymentSection.module.scss';

export function PaymentSection() {
  return (
    <section id="payment" className={styles.section} aria-labelledby="payment-title">
      <div className={styles.inner}>
        <div className={styles.media}>
          <PaymentImage />
        </div>
        <div className={styles.content}>
          <PaymentText />
          <Button href="#hits" className={styles.button}>
            Подробнее
          </Button>
        </div>
      </div>
    </section>
  );
}
