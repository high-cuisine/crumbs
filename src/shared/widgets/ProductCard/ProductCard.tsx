import Image from 'next/image';
import { Text } from '@/shared/UI/Typography';
import styles from './ProductCard.module.scss';

type ProductCardProps = {
  name: string;
  image: string;
  empty?: boolean;
  variant?: 'desktop' | 'mobile';
};

export function ProductCard({ name, image, empty = false, variant = 'desktop' }: ProductCardProps) {
  if (empty) {
    return <div className={styles.empty} aria-hidden="true" />;
  }

  return (
    <article className={styles.card} data-variant={variant}>
      <div className={styles.imageWrap}>
        <Image src={image} alt={name.replace('\n', ' ')} fill className={styles.image} sizes="200px" />
      </div>
      <Text as="p" variant="body" className={styles.name}>
        {name.split('\n').map((line, index) => (
          <span key={`${line}-${index}`}>
            {line}
            {index < name.split('\n').length - 1 && <br />}
          </span>
        ))}
      </Text>
    </article>
  );
}
