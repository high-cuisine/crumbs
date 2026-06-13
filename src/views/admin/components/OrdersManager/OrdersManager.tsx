'use client';
import { useState } from 'react';
import type { OrderRecord, OrderStatus } from '@/server/store/types';
import styles from './OrdersManager.module.scss';

const STATUS_LABELS: Record<OrderStatus, string> = {
  new: 'Новый',
  processing: 'В обработке',
  done: 'Выполнен',
  cancelled: 'Отменён',
};

const STATUS_BADGE: Record<OrderStatus, string> = {
  new: styles.badgeNew,
  processing: styles.badgeProcessing,
  done: styles.badgeDone,
  cancelled: styles.badgeCancelled,
};

const ALL_STATUSES: OrderStatus[] = ['new', 'processing', 'done', 'cancelled'];

type Props = { initialOrders: OrderRecord[] };

export function OrdersManager({ initialOrders }: Props) {
  const [orders, setOrders] = useState(initialOrders);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const toggleExpand = (id: string) => setExpanded((prev) => (prev === id ? null : id));

  const changeStatus = async (orderId: string, status: OrderStatus) => {
    setUpdating(orderId);
    try {
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status }),
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
      );
    } finally {
      setUpdating(null);
    }
  };

  if (orders.length === 0) {
    return <p className={styles.empty}>Заказов пока нет.</p>;
  }

  return (
    <div className={styles.list}>
      {orders.map((order) => {
        const isOpen = expanded === order.id;
        const date = new Date(order.createdAt).toLocaleString('ru-RU', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit',
        });
        const shortId = order.id.replace('ord_', '#').slice(0, 12);

        return (
          <div key={order.id} className={styles.card}>
            <div className={styles.header} onClick={() => toggleExpand(order.id)}>
              <span className={styles.id}>{shortId}</span>
              <span className={styles.date}>{date}</span>
              <span className={styles.customer}>{order.customer.name} · {order.customer.phone}</span>
              <span className={styles.total}>{order.total.toLocaleString('ru-RU')} ₽</span>
              <span className={`${styles.badge} ${STATUS_BADGE[order.status]}`}>{STATUS_LABELS[order.status]}</span>
              <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>▾</span>
            </div>

            <div className={`${styles.body} ${isOpen ? styles.bodyOpen : ''}`}>
              <div className={styles.bodyInner}>
                <div className={styles.grid}>
                  {order.customer.address && (
                    <div className={styles.field}>
                      <span className={styles.fieldLabel}>Адрес</span>
                      <span className={styles.fieldValue}>{order.customer.address}{order.customer.entrance && `, подъезд ${order.customer.entrance}`}{order.customer.floor && `, эт. ${order.customer.floor}`}{order.customer.apartment && `, кв. ${order.customer.apartment}`}{order.customer.doorCode && `, код ${order.customer.doorCode}`}</span>
                    </div>
                  )}
                  {order.customer.comment && (
                    <div className={styles.field}>
                      <span className={styles.fieldLabel}>Комментарий</span>
                      <span className={styles.fieldValue}>{order.customer.comment}</span>
                    </div>
                  )}
                </div>

                <div className={styles.items}>
                  {order.items.map((item, i) => (
                    <div key={i} className={styles.item}>
                      {item.name} — {item.price.toLocaleString('ru-RU')} ₽
                    </div>
                  ))}
                </div>

                <div className={styles.statusRow}>
                  <span className={styles.statusLabel}>Статус:</span>
                  {ALL_STATUSES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`${styles.statusBtn} ${order.status === s ? styles.statusBtnActive : ''}`}
                      onClick={() => changeStatus(order.id, s)}
                      disabled={updating === order.id}
                    >
                      {STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
