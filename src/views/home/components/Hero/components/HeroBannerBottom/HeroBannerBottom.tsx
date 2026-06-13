import Image from 'next/image';
import styles from './HeroBannerBottom.module.scss';

type HeroBannerBottomProps = {
  ring: string;
};

export function HeroBannerBottom({ ring }: HeroBannerBottomProps) {
  return (
    <div className={styles.bannerBottom} aria-hidden="true">
      {ring ? <Image src={ring} alt="" width={154} height={153} className={styles.ring} /> : null}
    </div>
  );
}
