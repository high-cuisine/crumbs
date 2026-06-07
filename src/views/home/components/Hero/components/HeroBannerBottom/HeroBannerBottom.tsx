import Image from 'next/image';
import { HERO_ASSETS } from '../../helpers/heroAssets';
import styles from './HeroBannerBottom.module.scss';

export function HeroBannerBottom() {
  return (
    <div className={styles.bannerBottom} aria-hidden="true">
      
      <Image
        src={HERO_ASSETS.bannerRing}
        alt=""
        width={154}
        height={153}
        className={styles.ring}
      />
    </div>
  );
}
