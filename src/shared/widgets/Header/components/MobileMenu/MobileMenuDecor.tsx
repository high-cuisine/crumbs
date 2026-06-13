import styles from './MobileMenu.module.scss';

export function MobileMenuDecor() {
  return (
    <>
      <span className={styles.donut} aria-hidden="true" />
      <svg
        className={styles.squiggle}
        width="123"
        height="144"
        viewBox="0 0 123 144"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M58 8C20 26 96 52 50 74C12 92 78 110 36 136"
          stroke="#af62a5"
          strokeWidth="15"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}
