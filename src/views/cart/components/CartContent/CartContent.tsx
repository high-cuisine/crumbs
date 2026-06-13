'use client';

import type { CartContent as CartContentData } from '@/server/content/schema';
import { useCart } from '@/shared/hooks';
import { Button } from '@/shared/UI/Button';
import { CartSetRow } from '../CartSetRow';
import { CartSummary } from '../CartSummary';
import styles from './CartContent.module.scss';

type CartContentProps = {
  content: CartContentData;
};

export function CartContent({ content }: CartContentProps) {
  const { items, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <h1 className={styles.emptyTitle}>{content.title}</h1>
        <p className={styles.emptyNote}>{content.note}</p>
        <Button href={content.linkHref}>{content.linkLabel}</Button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <section className={styles.main}>
          <h1 className={styles.title}>{content.pageTitle}</h1>
          <p className={styles.subtitle}>{content.subtitle}</p>
          <h2 className={styles.ordersTitle}>{content.ordersTitle}</h2>

          <div className={styles.list}>
            {items.map((item, index) => (
              <CartSetRow
                key={item.id}
                item={item}
                buyLabel={content.buyLabel}
                buyHref={content.checkoutHref}
                defaultOpen={index === 0}
                onRemove={removeItem}
                onQuantityChange={updateQuantity}
              />
            ))}
          </div>
        </section>

        <CartSummary
          items={items}
          checkoutLabel={content.checkoutLabel}
          checkoutHref={content.checkoutHref}
          summaryTitle={content.summaryTitle}
          goodsLabel={content.goodsLabel}
          deliveryNote={content.deliveryNote}
        />
      </div>
    </div>
  );
}
