import { NextResponse } from 'next/server';
import { z } from 'zod';
import { incrementSetOrderCount } from '@/server/catalog/repository';
import { OrderDeliveryError, sendOrderToTelegram } from '@/server/order/telegram';
import { saveOrder } from '@/server/orders/repository';

export const runtime = 'nodejs';

const zCookie = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  structure: z.string().optional(),
  composition: z.string().optional(),
  price: z.number(),
  images: z.array(z.string()),
  active: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

const zCartItem = z.object({
  id: z.string(),
  kind: z.enum(['preset', 'custom']),
  setId: z.string().optional(),
  boxTemplateId: z.string().optional(),
  name: z.string(),
  image: z.string(),
  price: z.number().int().nonnegative(),
  cookieCount: z.number().int().positive(),
  items: z.array(
    z.object({
      cookie: zCookie,
      quantity: z.number().int().positive(),
    }),
  ),
});

const zOrderBody = z.object({
  customer: z.object({
    name: z.string().trim().min(2, 'Укажите имя'),
    phone: z.string().trim().min(10, 'Укажите телефон'),
    address: z.string().optional().default(''),
    entrance: z.string().optional().default(''),
    doorCode: z.string().optional().default(''),
    floor: z.string().optional().default(''),
    apartment: z.string().optional().default(''),
    comment: z.string().optional().default(''),
  }),
  items: z.array(zCartItem).min(1, 'Корзина пуста'),
  total: z.number().int().nonnegative(),
});

export async function POST(request: Request) {
  try {
    const body = zOrderBody.parse(await request.json());

    const computedTotal = body.items.reduce((sum, item) => sum + item.price, 0);
    if (computedTotal !== body.total) {
      return NextResponse.json({ error: 'Некорректная сумма заказа' }, { status: 400 });
    }

    const order = body as import('@/shared/cart/orderTypes').OrderPayload;

    let savedOrder: { id: string };
    try {
      savedOrder = await saveOrder(order);
    } catch (saveError) {
      console.error('[api/order] saveOrder failed', saveError);
      return NextResponse.json({ error: 'Не удалось сохранить заказ' }, { status: 500 });
    }

    await sendOrderToTelegram(order);

    for (const item of body.items) {
      if (item.kind === 'preset' && item.setId) {
        incrementSetOrderCount(item.setId);
      }
    }

    return NextResponse.json({ ok: true, orderId: savedOrder.id });
  } catch (error) {
    if (error instanceof OrderDeliveryError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }
    if (error instanceof z.ZodError) {
      const message = error.issues[0]?.message ?? 'Некорректные данные';
      return NextResponse.json({ error: message }, { status: 400 });
    }
    console.error('[api/order]', error);
    return NextResponse.json({ error: 'Не удалось отправить заказ' }, { status: 500 });
  }
}
