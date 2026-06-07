import Image from 'next/image';
import { WHY_ASSETS } from '../../helpers/whyAssets';
import styles from './WhyDecorations.module.scss';

export function WhyDecorations() {
  return (
    <div className={styles.decorations} aria-hidden="true">
      <Image
        src={WHY_ASSETS.decorHook}
        alt=""
        width={123}
        height={145}
        className={styles.hook}
      />
      <Image
        src={WHY_ASSETS.decorSquiggleLeft}
        alt=""
        width={73}
        height={62}
        className={styles.squiggleLeft}
      />
      <Image
        src={WHY_ASSETS.decorSquiggleRight}
        alt=""
        width={85}
        height={59}
        className={styles.squiggleRight}
      />
    </div>
  );
}
