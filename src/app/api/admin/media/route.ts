import { NextResponse } from 'next/server';
import { listMedia } from '@/server/media/storage';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({ media: listMedia() });
}
