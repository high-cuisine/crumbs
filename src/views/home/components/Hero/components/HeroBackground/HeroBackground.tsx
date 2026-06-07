import Image from 'next/image';
import styles from './HeroBackground.module.scss';

const BG = {
  wave: '/images/hero/hero-bg-wave.svg',
} as const;

const DESKTOP_BLOB_PATH =
  'M643.812 592.312C612.878 585.88 574.519 562.911 544.291 551.925C470.05 524.943 126.34 675.99 12.6755 551.925C-122.929 403.912 -29.8336 0 -29.8336 0H724.83H1494L1509 558.388C1509 558.388 1232.56 556.296 1151.67 551.925C964.919 541.833 828.546 630.723 643.812 592.312Z';

const MOBILE_BLOB_PATH =
  'M175.729 522.454C166.173 516.781 154.323 496.521 144.985 486.831C122.051 463.031 15.8725 596.263 -19.2404 486.831C-61.131 356.275 -32.3722 0 -32.3722 0H200.756H438.365L443 492.532C443 492.532 357.604 490.687 332.613 486.831C274.924 477.929 232.796 556.336 175.729 522.454Z';

function BlobSvg({
  className,
  viewBox,
  path,
  preserveAspectRatio = 'xMidYMid meet',
}: {
  className: string;
  viewBox: string;
  path: string;
  preserveAspectRatio?: string;
}) {
  return (
    <svg
      className={className}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio={preserveAspectRatio}
    >
      <path d={path} fill="#FBD3DD" />
    </svg>
  );
}

export function HeroBackground() {
  return (
    <div className={styles.backgroundViewport} aria-hidden="true">
      <div className={styles.background}>
        <div className={styles.blobWrapperDesktop}>
          <BlobSvg
            className={styles.blobDesktopMirror}
            viewBox="0 0 1440 602"
            path={DESKTOP_BLOB_PATH}
          />
          <BlobSvg
            className={styles.blobDesktop}
            viewBox="0 0 1440 602"
            path={DESKTOP_BLOB_PATH}
          />
          <BlobSvg
            className={styles.blobDesktopMirror}
            viewBox="0 0 1440 602"
            path={DESKTOP_BLOB_PATH}
          />
        </div>

        <div className={styles.blobWrapperMobile}>
          <BlobSvg
            className={styles.blobMobileMirror}
            viewBox="0 0 402 531"
            path={MOBILE_BLOB_PATH}
            preserveAspectRatio="xMidYMax meet"
          />
          <BlobSvg
            className={styles.blobMobile}
            viewBox="0 0 402 531"
            path={MOBILE_BLOB_PATH}
            preserveAspectRatio="xMidYMax meet"
          />
          <BlobSvg
            className={styles.blobMobileMirror}
            viewBox="0 0 402 531"
            path={MOBILE_BLOB_PATH}
            preserveAspectRatio="xMidYMax meet"
          />
        </div>

        <Image src={BG.wave} alt="" width={1603} height={499} className={styles.wave} />
      </div>
    </div>
  );
}
