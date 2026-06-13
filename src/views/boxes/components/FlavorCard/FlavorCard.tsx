import Image from 'next/image';
import Link from 'next/link';
import styles from './FlavorCard.module.scss';

type FlavorCardProps = {
  name: string;
  image: string;
  doodle: string;
  href: string;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  incrementDisabled?: boolean;
};

export function FlavorCard({
  name,
  image,
  doodle,
  href,
  quantity,
  onIncrement,
  onDecrement,
  incrementDisabled = false,
}: FlavorCardProps) {
  return (
    <article className={styles.card}>
      <Link
        href={href}
        className={styles.media}
        style={{ backgroundImage: `url(${doodle})` }}
        aria-label={`Подробнее о «${name}»`}
      >
        <Image src={image} alt={name} width={180} height={172} className={styles.cookie} />
      </Link>

      <div className={styles.panel}>
        <div className={styles.counter}>
          <button
            type="button"
            className={styles.step}
            onClick={onIncrement}
            disabled={incrementDisabled}
            aria-label={`Добавить «${name}»`}
          >
            +
          </button>
          <span className={styles.count} aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            className={styles.step}
            onClick={onDecrement}
            disabled={quantity === 0}
            aria-label={`Убрать «${name}»`}
          >
            −
          </button>
        </div>
        <Link href={href} className={styles.name}>
          {name}
        </Link>
      </div>
    </article>
  );
}
