import type { Metadata } from 'next';
import { BoxesPage } from '@/views/boxes';

export const metadata: Metadata = {
  title: 'Signature — 6 шт — WOW! CRUMBS',
  description: 'Выберите вкусы — мы аккуратно соберём ваш набор Signature',
};

export const dynamic = 'force-dynamic';

export default function Page() {
  return <BoxesPage boxId="signature" />;
}
