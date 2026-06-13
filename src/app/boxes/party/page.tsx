import type { Metadata } from 'next';
import { BoxesPage } from '@/views/boxes';

export const metadata: Metadata = {
  title: 'Party — 12 шт — WOW! CRUMBS',
  description: 'Выберите вкусы — мы аккуратно соберём ваш набор Party',
};

export const dynamic = 'force-dynamic';

export default function Page() {
  return <BoxesPage boxId="party" />;
}
