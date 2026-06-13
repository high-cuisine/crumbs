import Image from 'next/image';
import type { DeliveryContent } from '@/server/content/schema';
import { Container } from '@/shared/UI/Container';
import styles from './DeliveryHero.module.scss';

type DeliveryHeroProps = {
  title: string;
  banner: DeliveryContent['banner'];
};

export function DeliveryHero({ title, banner }: DeliveryHeroProps) {
  return (
    <Container className={styles.hero}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.banner}>
        <Image
          src={banner.src}
          alt={banner.alt}
          width={1085}
          height={488}
          className={styles.bannerImage}
          priority
        />
      </div>
    </Container>
  );
}
