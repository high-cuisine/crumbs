import type { Metadata } from 'next';
import { CartPage } from '@/views/cart';

export const metadata: Metadata = {
  title: 'Корзина — WOW! CRUMBS',
  description: 'Ваш набор печенья WOW! CRUMBS',
};

export const dynamic = 'force-dynamic';

export default function Page() {
  return <CartPage />;
}
