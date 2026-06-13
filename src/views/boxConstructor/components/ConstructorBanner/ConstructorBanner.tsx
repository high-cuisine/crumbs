import Image from 'next/image';
import styles from './ConstructorBanner.module.scss';

type ConstructorBannerProps = {
  bannerText: string;
  blobLeft: string;
  blobRight: string;
};

export function ConstructorBanner({ bannerText, blobLeft, blobRight }: ConstructorBannerProps) {
  return (
    <section className={styles.banner} aria-label={bannerText}>
      <Image src={blobLeft} alt="" width={188} height={190} className={styles.blobLeft} aria-hidden="true" />
      <p className={styles.text}>{bannerText}</p>
      <Image src={blobRight} alt="" width={117} height={115} className={styles.blobRight} aria-hidden="true" />
    </section>
  );
}
