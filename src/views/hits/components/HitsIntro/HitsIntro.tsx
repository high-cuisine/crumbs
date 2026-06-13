import Image from 'next/image';
import type { HitsContent } from '@/server/content/schema';
import { Container } from '@/shared/UI/Container';
import styles from './HitsIntro.module.scss';

type HitsIntroProps = {
  title: string;
  subtitle: string;
  banner: HitsContent['banner'];
};

export function HitsIntro({ title, subtitle, banner }: HitsIntroProps) {
  return (
    <Container className={styles.intro}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
      <div className={styles.banner}>
        <Image
          src={banner.src}
          alt={banner.alt}
          width={1082}
          height={252}
          className={styles.bannerImage}
          priority
        />
      </div>
    </Container>
  );
}
