'use client';

import type { CartItem } from '@/shared/cart/types';
import { cartTotal, cartCount } from '@/shared/cart/types';
import { CartSetAccordion } from './components/CartSetAccordion';
import styles from './OrderSummary.module.scss';

type OrderSummaryProps = {
  items: CartItem[];
  onRemove?: (id: string) => void;
  showDelivery?: boolean;
  /** На странице корзины показываем только итоги — наборы слева отдельно. */
  mode?: 'full' | 'totals';
};

export function OrderSummary({
  items,
  onRemove,
  showDelivery = true,
  mode = 'full',
}: OrderSummaryProps) {
  const total = cartTotal(items);
  const goodsTotal = total;
  const count = cartCount(items);

  return (
    <aside className={styles.summary}>
      <h2 className={styles.title}>Ваш заказ</h2>

      {mode === 'full' && (
        <div className={styles.sets}>
          {items.map((item) => (
            <CartSetAccordion key={item.id} item={item} onRemove={onRemove} />
          ))}
        </div>
      )}

      <div className={styles.totals}>
        <div className={styles.row}>
          <span>Товары ({count})</span>
          <span>{goodsTotal.toLocaleString('ru-RU')} ₽</span>
        </div>
        {showDelivery && (
          <div className={styles.row}>
            <span>Доставка</span>
            <span className={styles.free}>Бесплатно</span>
          </div>
        )}
        <div className={styles.rowTotal}>
          <span>Итого</span>
          <span>{total.toLocaleString('ru-RU')} ₽</span>
        </div>
      </div>

      <p className={styles.note}>
        Менеджер свяжется с вами для подтверждения заказа и уточнения деталей оплаты.
      </p>
    </aside>
  );
}
