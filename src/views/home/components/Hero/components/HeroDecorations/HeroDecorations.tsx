'use client';

import Image from 'next/image';
import type { HomeContent } from '@/server/content/schema';
import { classNames } from '@/shared/helpers/classNames';
import { useInView } from '@/shared/hooks';
import styles from './HeroDecorations.module.scss';

const CRUMB_POSITIONS = ['crumbOne', 'crumbTwo', 'crumbThree', 'crumbFour', 'crumbFive'] as const;

type HeroDecorationsProps = {
  data: HomeContent['hero'];
};

export function HeroDecorations({ data }: HeroDecorationsProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={classNames(styles.decorations, inView && styles.in)}
      aria-hidden="true"
    >
      <Image src={data.scribble} alt="" width={736} height={514} className={styles.scribble} />
      <Image src={data.scribbleTop} alt="" width={325} height={217} className={styles.scribbleTop} />
      <Image
        src={data.scribbleSecondary}
        alt=""
        width={208}
        height={219}
        className={styles.scribbleSecondary}
      />
      <Image src={data.blurCircle} alt="" width={122} height={129} className={styles.blurCircle} />
      <Image src={data.ring} alt="" width={253} height={253} className={styles.ring} />
      <Image src={data.zigzag} alt="" width={196} height={330} className={styles.zigzag} />

      {data.crumbs.map((src, index) => (
        <Image
          key={`${src}-${index}`}
          src={src}
          alt=""
          width={40}
          height={40}
          className={styles[CRUMB_POSITIONS[index]]}
        />
      ))}

      <div className={styles.cookieSecondary}>
        <Image
          src={data.cookieSecondary}
          alt=""
          fill
          className={styles.cookieImage}
          sizes="(max-width: 768px) 280px, 494px"
        />
      </div>

      <div className={styles.cookieMain}>
        <Image
          src={data.cookieMain.src}
          alt={data.cookieMain.alt}
          fill
          className={styles.cookieImage}
          priority
          sizes="(max-width: 768px) 320px, 662px"
        />
      </div>
    </div>
  );
}
