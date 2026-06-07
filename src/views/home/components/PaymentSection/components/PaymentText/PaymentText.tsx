import styles from './PaymentText.module.scss';

const PAYMENT_COPY = `💳 ОПЛАТА

Оплата производится после подтверждения заказа.
Мы отправим итоговую сумму с учётом доставки и удобный способ оплаты.

Доступна оплата переводом через СБП.`;

export function PaymentText() {
  return (
    <div className={styles.text}>
      <h2 id="payment-title" className={styles.copy}>
        {PAYMENT_COPY}
      </h2>
    </div>
  );
}
