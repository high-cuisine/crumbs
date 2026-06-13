import type { HomeContent } from '@/server/content/schema';
import { Button } from '@/shared/UI/Button';
import { PaymentImage } from './components/PaymentImage';
import { PaymentText } from './components/PaymentText';
import styles from './PaymentSection.module.scss';

type PaymentSectionProps = {
  data: HomeContent['payment'];
};

export function PaymentSection({ data }: PaymentSectionProps) {
  return (
    <section id="payment" className={styles.section} aria-labelledby="payment-title">
      <div className={styles.inner}>
        <div className={styles.media}>
          <PaymentImage image={data.image} />
        </div>
        <div className={styles.content}>
          <PaymentText title={data.title} body={data.body} accent={data.accent} />
          <Button href={data.button.href} className={styles.button}>
            {data.button.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
