import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE } from '@/server/auth/session';
import { listOrders, updateOrderStatus } from '@/server/orders/repository';
import type { OrderStatus } from '@/server/store/types';

export const runtime = 'nodejs';

async function checkAuth(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export async function GET() {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const orders = listOrders();
  return NextResponse.json({ orders });
}

export async function PATCH(request: Request) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, status } = await request.json() as { id: string; status: OrderStatus };
  if (!id || !status) return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
  updateOrderStatus(id, status);
  return NextResponse.json({ ok: true });
}
