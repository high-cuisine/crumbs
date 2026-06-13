import type { OrderPayload } from '@/shared/cart/orderTypes';

function formatPrice(value: number): string {
  return `${value.toLocaleString('ru-RU')} ₽`;
}

function formatAddress(customer: OrderPayload['customer']): string | null {
  const hasAddress = customer.address.trim().length > 0;
  const details = [
    customer.entrance && `подъезд ${customer.entrance}`,
    customer.floor && `этаж ${customer.floor}`,
    customer.apartment && `кв. ${customer.apartment}`,
    customer.doorCode && `код ${customer.doorCode}`,
  ].filter(Boolean);

  if (!hasAddress && details.length === 0) return null;

  const parts = hasAddress ? [customer.address.trim()] : [];
  if (details.length > 0) parts.push(`(${details.join(', ')})`);
  return parts.join(' ');
}

/** Форматирует заказ для отправки в Telegram. */
export function formatOrderMessage(order: OrderPayload): string {
  const lines: string[] = [
    '🛒 Новый заказ WOW! CRUMBS',
    '',
    `👤 Имя: ${order.customer.name}`,
    `📞 Телефон: ${order.customer.phone}`,
  ];

  const address = formatAddress(order.customer);
  if (address) {
    lines.push(`📍 Адрес: ${address}`);
  }

  if (order.customer.comment.trim()) {
    lines.push(`📝 Комментарий: ${order.customer.comment.trim()}`);
  }

  lines.push('', '📦 Наборы:');

  order.items.forEach((item, index) => {
    const name = item.name.replace(/\n/g, ' ');
    const qtyLabel = item.quantity > 1 ? ` × ${item.quantity}` : '';
    lines.push(
      `${index + 1}. ${name}${qtyLabel} — ${formatPrice(item.price * item.quantity)}`,
    );
    for (const { cookie, quantity } of item.items) {
      lines.push(`   • ${cookie.name} × ${quantity}`);
    }
  });

  lines.push('', `💰 Итого: ${formatPrice(order.total)}`);

  return lines.join('\n');
}
