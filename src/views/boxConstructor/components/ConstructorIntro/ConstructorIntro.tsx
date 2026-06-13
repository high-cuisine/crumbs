import Image from 'next/image';
import type { BoxesContent } from '@/server/content/schema';
import { Button } from '@/shared/UI/Button';
import { Container } from '@/shared/UI/Container';
import styles from './ConstructorIntro.module.scss';

type ConstructorIntroProps = {
  data: BoxesContent['constructor'];
};

export function ConstructorIntro({ data }: ConstructorIntroProps) {
  return (
    <Container className={styles.intro}>
      <div className={styles.info}>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.note}>{data.note}</p>
        <Button href={data.cartHref} className={styles.cart}>
          {data.cartLabel}
        </Button>
      </div>

      <div className={styles.hero}>
        <Image
          src={data.hero.src}
          alt={data.hero.alt}
          width={562}
          height={383}
          className={styles.heroImage}
          priority
        />
      </div>
    </Container>
  );
}
