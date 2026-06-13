import Image from 'next/image';
import { Button } from '@/shared/UI/Button';
import styles from './SizeCard.module.scss';

type SizeCardProps = {
  name: string;
  image: string;
  onSelect: () => void;
};

export function SizeCard({ name, image, onSelect }: SizeCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image
          src={image}
          alt={name}
          width={262}
          height={232}
          className={styles.image}
        />
      </div>
      <p className={styles.name}>{name}</p>
      <Button onClick={onSelect} className={styles.action}>
        Собрать
      </Button>
    </article>
  );
}
