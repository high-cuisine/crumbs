import type { Metadata } from 'next';
import { DeliveryPage } from '@/views/delivery';

export const metadata: Metadata = {
  title: 'Доставка — WOW! CRUMBS',
  description: 'Доставка печенья WOW! CRUMBS — укажите адрес и оформите заказ',
};

export const dynamic = 'force-dynamic';

export default function Page() {
  return <DeliveryPage />;
}
