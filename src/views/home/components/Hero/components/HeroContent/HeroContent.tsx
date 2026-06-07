import styles from './HeroContent.module.scss';

export function HeroContent() {
  return (
    <div className={styles.content}>
      <h1 className={styles.title}>Печенье, которое ломают ради этого момента</h1>
      <p className={styles.subtitle}>
        Хруст снаружи. Мягкое, тягучее внутри. Сочна
      </p>
    </div>
  );
}
