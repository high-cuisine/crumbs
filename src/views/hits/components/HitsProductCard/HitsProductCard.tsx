import Image from 'next/image';
import type { ResolvedCookieSet } from '@/server/catalog/schema';
import { AddSetToCartButton } from '@/shared/cart';
import styles from './HitsProductCard.module.scss';

type HitsProductCardProps = {
  set: ResolvedCookieSet;
  buyLabel: string;
};

export function HitsProductCard({ set, buyLabel }: HitsProductCardProps) {
  const lines = set.name.split('\n');

  return (
    <article className={styles.card} data-product={set.id}>
      <div className={styles.media}>
        <Image
          src={set.image}
          alt={set.name.replace('\n', ' ')}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 525px"
        />
      </div>

      <div className={styles.footer}>
        <p className={styles.name}>
          {lines.map((line, index) => (
            <span key={`${line}-${index}`}>
              {line}
              {index < lines.length - 1 && <br />}
            </span>
          ))}
        </p>
        <AddSetToCartButton set={set} label={buyLabel} className={styles.action} />
      </div>
    </article>
  );
}
