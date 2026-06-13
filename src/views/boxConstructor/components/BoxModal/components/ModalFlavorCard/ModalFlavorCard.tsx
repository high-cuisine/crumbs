import Image from 'next/image';
import Link from 'next/link';
import styles from './ModalFlavorCard.module.scss';

type ModalFlavorCardProps = {
  name: string;
  image: string;
  doodle: string;
  color: string;
  href: string;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  incrementDisabled?: boolean;
};

export function ModalFlavorCard({
  name,
  image,
  doodle,
  color,
  href,
  quantity,
  onIncrement,
  onDecrement,
  incrementDisabled = false,
}: ModalFlavorCardProps) {
  return (
    <article className={styles.card} style={{ backgroundColor: color }}>
      <Link
        href={href}
        className={styles.media}
        style={{ backgroundImage: `url(${doodle})` }}
        aria-label={`Подробнее о «${name}»`}
      >
        <Image src={image} alt={name} width={120} height={114} className={styles.cookie} />
      </Link>

      <p className={styles.name}>{name}</p>

      <div className={styles.counter}>
        <button
          type="button"
          className={styles.step}
          onClick={onDecrement}
          disabled={quantity === 0}
          aria-label={`Убрать «${name}»`}
        >
          −
        </button>
        <span className={styles.count} aria-live="polite">
          {quantity}
        </span>
        <button
          type="button"
          className={styles.step}
          onClick={onIncrement}
          disabled={incrementDisabled}
          aria-label={`Добавить «${name}»`}
        >
          +
        </button>
      </div>

      <Link href={href} className={styles.compound}>
        Подробнее
      </Link>
    </article>
  );
}
