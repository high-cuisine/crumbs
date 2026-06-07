import Image from 'next/image';
import { HERO_ASSETS } from '../../helpers/heroAssets';
import styles from './HeroDecorations.module.scss';

const CRUMB_POSITIONS = ['crumbOne', 'crumbTwo', 'crumbThree', 'crumbFour', 'crumbFive'] as const;

export function HeroDecorations() {
  return (
    <div className={styles.decorations} aria-hidden="true">
      <Image
        src={HERO_ASSETS.scribble}
        alt=""
        width={736}
        height={514}
        className={styles.scribble}
      />

      <Image
        src={HERO_ASSETS.scribbleTop}
        alt=""
        width={325}
        height={217}
        className={styles.scribbleTop}
      />

      <Image
        src={HERO_ASSETS.scribbleSecondary}
        alt=""
        width={208}
        height={219}
        className={styles.scribbleSecondary}
      />

      <Image
        src={HERO_ASSETS.blurCircle}
        alt=""
        width={122}
        height={129}
        className={styles.blurCircle}
      />

      <Image src={HERO_ASSETS.ring} alt="" width={253} height={253} className={styles.ring} />

      <Image src={HERO_ASSETS.zigzag} alt="" width={196} height={330} className={styles.zigzag} />

      {HERO_ASSETS.crumbs.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={40}
          height={40}
          className={styles[CRUMB_POSITIONS[index]]}
        />
      ))}

      <div className={styles.cookieSecondary}>
        <Image
          src={HERO_ASSETS.cookieSecondary}
          alt=""
          fill
          className={styles.cookieImage}
          sizes="(max-width: 768px) 280px, 494px"
        />
      </div>

      <div className={styles.cookieMain}>
        <Image
          src={HERO_ASSETS.cookieMain}
          alt="Шоколадное печенье WOW CRUMBS"
          fill
          className={styles.cookieImage}
          priority
          sizes="(max-width: 768px) 320px, 662px"
        />
      </div>
    </div>
  );
}
