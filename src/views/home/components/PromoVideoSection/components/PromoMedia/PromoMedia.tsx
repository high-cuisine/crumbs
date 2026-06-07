import Image from 'next/image';
import { PlayButton } from '@/shared/UI/PlayButton';
import { PROMO_ASSETS } from '../../helpers/promoAssets';
import styles from './PromoMedia.module.scss';

export function PromoMedia() {
  return (
    <div className={styles.media}>
      <Image
        src={PROMO_ASSETS.media}
        alt="Печенье на ложке"
        fill
        className={styles.image}
        sizes="(max-width: 768px) 100vw, 457px"
        priority
      />
      <PlayButton className={styles.play} />
    </div>
  );
}
