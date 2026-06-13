import type { Metadata } from 'next';
import { HitsPage } from '@/views/hits';

export const metadata: Metadata = {
  title: 'Хиты — WOW! CRUMBS',
  description: 'Самые популярные вкусы печенья WOW! CRUMBS — идеальный выбор для первого заказа',
};

export const dynamic = 'force-dynamic';

export default function Page() {
  return <HitsPage />;
}
