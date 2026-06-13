import { getStore } from '../store';
import type { OrderRecord, OrderStatus } from '../store/types';
import type { OrderPayload } from '@/shared/cart/orderTypes';

export function listOrders(): OrderRecord[] {
  return getStore().listOrders();
}

export function saveOrder(payload: OrderPayload): OrderRecord {
  const items = payload.items.map((item) => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity ?? 1,
    cookieCount: item.cookieCount,
    kind: item.kind,
  }));
  return getStore().saveOrder({
    customer: payload.customer,
    items,
    total: payload.total,
    status: 'new',
  });
}

export function updateOrderStatus(id: string, status: OrderStatus): void {
  getStore().updateOrderStatus(id, status);
}
