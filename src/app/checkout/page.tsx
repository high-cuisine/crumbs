import type { Metadata } from 'next';
import { CheckoutPage } from '@/views/checkout';

export const metadata: Metadata = {
  title: 'Оформление заказа — WOW! CRUMBS',
  description: 'Оформите заказ печенья WOW! CRUMBS — доставка и оплата при получении',
};

export const dynamic = 'force-dynamic';

export default function Page() {
  return <CheckoutPage />;
}
