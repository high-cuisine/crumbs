import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, verifySessionToken } from '@/server/auth/session';
import { listOrders } from '@/server/orders/repository';
import { OrdersManager } from '@/views/admin/components/OrdersManager';
import styles from '../[section]/section.module.scss';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  const authenticated = await verifySessionToken(token);
  if (!authenticated) {
    redirect('/admin/login');
  }

  const orders = listOrders();

  return (
    <div>
      <h1 className={styles.title}>Заказы</h1>
      <p className={styles.hint}>
        Всего заказов: {orders.length}
      </p>
      <OrdersManager initialOrders={orders} />
    </div>
  );
}
