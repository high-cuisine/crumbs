import Image from 'next/image';
import styles from './HitsBanner.module.scss';

type HitsBannerProps = {
  bottomText: string;
  donut: string;
  cat: string;
};

export function HitsBanner({ bottomText, donut, cat }: HitsBannerProps) {
  return (
    <section className={styles.banner} aria-label={bottomText}>
      <Image src={donut} alt="" width={94} height={95} className={styles.donut} aria-hidden="true" />
      <p className={styles.text}>{bottomText}</p>
      <Image src={cat} alt="" width={117} height={115} className={styles.cat} aria-hidden="true" />
    </section>
  );
}
