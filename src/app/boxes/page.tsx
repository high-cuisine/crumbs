import type { Metadata } from 'next';
import { ConstructorPage } from '@/views/boxConstructor';

export const metadata: Metadata = {
  title: 'Собрать набор — WOW! CRUMBS',
  description: 'Выберите размер набора и соберите коробку печенья WOW! CRUMBS',
};

export const dynamic = 'force-dynamic';

export default function Page() {
  return <ConstructorPage />;
}
