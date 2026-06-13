import { NextResponse } from 'next/server';
import { listCookies } from '@/server/catalog/repository';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({ cookies: listCookies() });
}
