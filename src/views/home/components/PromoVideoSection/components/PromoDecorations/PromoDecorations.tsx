import Image from 'next/image';
import { PROMO_ASSETS } from '../../helpers/promoAssets';
import styles from './PromoDecorations.module.scss';

export function PromoDecorations() {
  return (
    <div className={styles.decorations} aria-hidden="true">
      <Image
        src={PROMO_ASSETS.decorRing}
        alt=""
        width={132}
        height={132}
        className={styles.ring}
      />
    </div>
  );
}
