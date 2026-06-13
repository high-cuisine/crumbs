'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { CartItem } from '@/shared/cart/types';
import { cartTotal } from '@/shared/cart/types';
import type { OrderFormData } from '@/shared/cart/orderTypes';
import { ORDER_FIELD_LABELS } from '@/shared/cart/orderTypes';
import { useCart } from '@/shared/hooks';
import { OrderSummary } from '@/shared/widgets/OrderSummary';
import { CheckoutSteps } from '../CheckoutSteps';
import { ThankYouModal } from '../ThankYouModal';
import styles from './CheckoutContent.module.scss';

const EMPTY_FORM: OrderFormData = {
  name: '',
  phone: '',
  address: '',
  entrance: '',
  doorCode: '',
  floor: '',
  apartment: '',
  comment: '',
};

type CheckoutContentProps = {
  backLabel: string;
};

export function CheckoutContent({ backLabel }: CheckoutContentProps) {
  const router = useRouter();
  const { items, removeItem, clear } = useCart();
  const [form, setForm] = useState<OrderFormData>(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ready, setReady] = useState(false);

  const total = cartTotal(items);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || success) return;
    if (items.length === 0) router.replace('/cart');
  }, [items.length, ready, router, success]);

  if (!ready || (items.length === 0 && !success)) {
    return null;
  }

  const updateField = (key: keyof OrderFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer: form, items, total }),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? 'Не удалось отправить заказ');
      }

      clear();
      setSuccess(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Ошибка отправки');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <ThankYouModal onClose={() => { setSuccess(false); }} />;
  }

  return (
    <div className={styles.page}>
      <CheckoutSteps current="checkout" />

      <div className={styles.layout}>
        <section className={styles.formSection}>
          <Link href="/cart" className={styles.back}>
            ← {backLabel}
          </Link>

          <h2 className={styles.sectionTitle}>Контактные данные</h2>
          <p className={styles.sectionNote}>
            Заполните форму — мы отправим заказ менеджеру и свяжемся с вами для подтверждения.
            Онлайн-оплата не требуется.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fields}>
              <label className={styles.fieldFull}>
                <span className={styles.label}>{ORDER_FIELD_LABELS.name}</span>
                <input
                  className={styles.input}
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  required
                  autoComplete="name"
                />
              </label>

              <label className={styles.fieldFull}>
                <span className={styles.label}>{ORDER_FIELD_LABELS.phone}</span>
                <input
                  className={styles.input}
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  required
                  autoComplete="tel"
                  placeholder="+7"
                />
              </label>

              <h3 className={styles.groupTitle}>Адрес доставки</h3>
              <p className={styles.groupNote}>Необязательно — можно указать позже при звонке менеджера</p>

              <label className={styles.fieldFull}>
                <span className={styles.label}>{ORDER_FIELD_LABELS.address}</span>
                <input
                  className={styles.input}
                  value={form.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  autoComplete="street-address"
                />
              </label>

              <label className={styles.fieldHalf}>
                <span className={styles.label}>{ORDER_FIELD_LABELS.entrance}</span>
                <input
                  className={styles.input}
                  value={form.entrance}
                  onChange={(e) => updateField('entrance', e.target.value)}
                />
              </label>

              <label className={styles.fieldHalf}>
                <span className={styles.label}>{ORDER_FIELD_LABELS.doorCode}</span>
                <input
                  className={styles.input}
                  value={form.doorCode}
                  onChange={(e) => updateField('doorCode', e.target.value)}
                />
              </label>

              <label className={styles.fieldHalf}>
                <span className={styles.label}>{ORDER_FIELD_LABELS.floor}</span>
                <input
                  className={styles.input}
                  value={form.floor}
                  onChange={(e) => updateField('floor', e.target.value)}
                />
              </label>

              <label className={styles.fieldHalf}>
                <span className={styles.label}>{ORDER_FIELD_LABELS.apartment}</span>
                <input
                  className={styles.input}
                  value={form.apartment}
                  onChange={(e) => updateField('apartment', e.target.value)}
                />
              </label>

              <label className={styles.fieldFull}>
                <span className={styles.label}>{ORDER_FIELD_LABELS.comment}</span>
                <textarea
                  className={styles.textarea}
                  value={form.comment}
                  onChange={(e) => updateField('comment', e.target.value)}
                  rows={3}
                />
              </label>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.submit} disabled={loading}>
              <span>{loading ? 'Отправляем…' : 'Отправить заказ'}</span>
              <span>{total.toLocaleString('ru-RU')} ₽</span>
            </button>

            <p className={styles.consent}>
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных для оформления
              заказа.
            </p>
          </form>
        </section>

        <OrderSummary items={items} onRemove={removeItem} />
      </div>
    </div>
  );
}
