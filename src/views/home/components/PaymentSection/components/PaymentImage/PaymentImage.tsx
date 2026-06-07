import Image from 'next/image';
import styles from './PaymentImage.module.scss';

export function PaymentImage() {
  return (
    <div className={styles.imageWrap}>
      <Image
        src="/images/payment-311a7a.png"
        alt="Оплата заказа"
        fill
        className={styles.image}
        sizes="(max-width: 768px) 100vw, 335px"
      />
    </div>
  );
}
