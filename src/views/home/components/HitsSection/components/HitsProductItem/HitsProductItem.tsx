import Image from 'next/image';
import styles from './HitsProductItem.module.scss';

type HitsProductItemProps = {
  id: string;
  name: string;
  image: string;
  overlayImage?: string;
  variant?: 'desktop' | 'mobile';
};

export function HitsProductItem({
  id,
  name,
  image,
  overlayImage,
  variant = 'desktop',
}: HitsProductItemProps) {
  const lines = name.split('\n');

  return (
    <article className={styles.item} data-variant={variant} data-product={id}>
      <div className={styles.imageWrap}>
        <Image
          src={image}
          alt={name.replace('\n', ' ')}
          fill
          className={styles.image}
          sizes={variant === 'mobile' ? '149px' : '199px'}
        />
        {overlayImage && (
          <Image
            src={overlayImage}
            alt=""
            width={163}
            height={146}
            className={styles.overlay}
          />
        )}
      </div>
      <p className={styles.name}>
        {lines.map((line, index) => (
          <span key={`${line}-${index}`}>
            {line}
            {index < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    </article>
  );
}
