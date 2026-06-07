import Image from 'next/image';
import { HITS_ASSETS } from '@/views/home/helpers/hitsAssets';
import styles from './HitsDecorations.module.scss';

export function HitsDecorations() {
  return (
    <div className={styles.decorations} aria-hidden="true">
      <Image
        src={HITS_ASSETS.decorBlobLeft}
        alt=""
        width={280}
        height={275}
        className={styles.blobLeft}
      />
      <Image
        src={HITS_ASSETS.decorBlobRight}
        alt=""
        width={166}
        height={164}
        className={styles.blobRight}
      />
    </div>
  );
}
