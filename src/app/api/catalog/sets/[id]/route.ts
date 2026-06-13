import { NextResponse } from 'next/server';
import { getSet, incrementSetOrderCount } from '@/server/catalog/repository';

export const runtime = 'nodejs';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const set = getSet(id);
  if (!set) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ set });
}

export async function POST(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const set = getSet(id);
  if (!set) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  incrementSetOrderCount(id);
  return NextResponse.json({ ok: true });
}
