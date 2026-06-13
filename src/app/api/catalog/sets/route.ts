import { NextResponse } from 'next/server';
import { listSets } from '@/server/catalog/repository';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({ sets: listSets() });
}
