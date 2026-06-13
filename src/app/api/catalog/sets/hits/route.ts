import { NextResponse } from 'next/server';
import { listHitSets } from '@/server/catalog/repository';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit') ?? '8');
  const sets = listHitSets(Number.isFinite(limit) && limit > 0 ? limit : 8);
  return NextResponse.json({ sets });
}
