import Image from 'next/image';
import { WHY_GALLERY } from '@/views/home/helpers';
import styles from './WhyGallery.module.scss';

export function WhyGallery() {
  return (
    <div className={styles.gallery}>
      {WHY_GALLERY.map((item) => (
        <div key={item.id} className={styles.item}>
          <Image src={item.image} alt={item.alt} fill className={styles.image} sizes="(max-width: 768px) 50vw, 255px" />
        </div>
      ))}
    </div>
  );
}
