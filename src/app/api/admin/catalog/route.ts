import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE } from '@/server/auth/session';
import {
  deleteCookie,
  deleteSet,
  listAllCookies,
  listAllSets,
  saveCookie,
  saveSet,
} from '@/server/catalog/repository';

export const runtime = 'nodejs';

async function requireAdmin(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ cookies: listAllCookies(), sets: listAllSets() });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { type?: string; data?: unknown };
    if (body.type === 'cookie') {
      const cookie = saveCookie(body.data);
      return NextResponse.json({ cookie });
    }
    if (body.type === 'set') {
      const set = saveSet(body.data);
      return NextResponse.json({ set });
    }
    return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Validation error';
    return NextResponse.json({ error: message.slice(0, 300) }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const id = searchParams.get('id');
  if (!type || !id) {
    return NextResponse.json({ error: 'type and id required' }, { status: 400 });
  }

  if (type === 'cookie') deleteCookie(id);
  else if (type === 'set') deleteSet(id);
  else return NextResponse.json({ error: 'Unknown type' }, { status: 400 });

  return NextResponse.json({ ok: true });
}
