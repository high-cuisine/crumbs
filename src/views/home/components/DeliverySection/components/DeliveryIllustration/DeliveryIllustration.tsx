import Image from 'next/image';
import styles from './DeliveryIllustration.module.scss';

export function DeliveryIllustration() {
  return (
    <div className={styles.illustration}>
      <Image
        src="/images/delivery-truck-3e2e36.png"
        alt="Доставка WOW CRUMBS"
        fill
        className={styles.image}
        sizes="(max-width: 768px) 100vw, 560px"
      />
    </div>
  );
}
