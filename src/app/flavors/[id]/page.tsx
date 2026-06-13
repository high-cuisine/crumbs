import type { Metadata } from 'next';
import { getCookieById } from '@/server/catalog/repository';
import { FlavorPage } from '@/views/flavor';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const cookie = getCookieById(id);
  if (!cookie) return { title: 'Вкус не найден — WOW! CRUMBS' };
  return {
    title: `${cookie.name} — WOW! CRUMBS`,
    description: cookie.description || `Печенье ${cookie.name} от WOW! CRUMBS`,
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <FlavorPage id={id} />;
}
