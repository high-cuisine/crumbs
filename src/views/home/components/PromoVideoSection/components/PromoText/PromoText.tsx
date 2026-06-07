import styles from './PromoText.module.scss';

const DESCRIPTION = `Соберите сочетание,
которое хочется попробовать именно сейчас.
Нажмите на карточку, чтобы увидеть начинку, состав, кбжу и детали вкуса.

Каждый вкус — с характером и своей текстурой.`;

export function PromoText() {
  return (
    <div className={styles.text}>
      <h2 id="promo-title" className={styles.title}>
        Повод для десерта
      </h2>
      <p className={styles.body}>
        <strong className={styles.subtitle}>Выберите вкусы</strong>
        {'\n'}
        {DESCRIPTION}
      </p>
    </div>
  );
}
