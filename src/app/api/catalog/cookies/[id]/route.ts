import { NextResponse } from 'next/server';
import { getCookie } from '@/server/catalog/repository';

export const runtime = 'nodejs';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const cookie = getCookie(id);
  if (!cookie) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ cookie });
}
