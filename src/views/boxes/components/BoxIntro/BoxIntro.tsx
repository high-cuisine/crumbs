import Image from 'next/image';
import Link from 'next/link';
import type { BoxesContent } from '@/server/content/schema';
import { Container } from '@/shared/UI/Container';
import styles from './BoxIntro.module.scss';

type BoxIntroProps = {
  box: BoxesContent['sets']['mini'];
};

export function BoxIntro({ box }: BoxIntroProps) {
  return (
    <Container className={styles.intro}>
      <div className={styles.info}>
        <h1 className={styles.title}>{box.title}</h1>
        <Link href={box.cartHref} className={styles.cart}>
          {box.cartLabel}
        </Link>
        <p className={styles.note}>{box.note}</p>
      </div>

      <div className={styles.mockup}>
        <Image
          src={box.mockup}
          alt={box.mockupAlt}
          width={526}
          height={379}
          className={styles.mockupImage}
          priority
        />
      </div>
    </Container>
  );
}
