import type { OrderPayload } from '@/shared/cart/orderTypes';
import { getSettings } from '@/server/settings/repository';
import { formatOrderMessage } from './format';

export class OrderDeliveryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OrderDeliveryError';
  }
}

async function sendToRecipient(token: string, chatId: string, text: string): Promise<void> {
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new OrderDeliveryError(
      `Telegram API error ${response.status}${body ? `: ${body.slice(0, 200)}` : ''}`,
    );
  }
}

export async function sendOrderToTelegram(order: OrderPayload): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    console.warn('Telegram не настроен: отсутствует TELEGRAM_BOT_TOKEN. Заказ сохранён без уведомления.');
    return;
  }

  const envChatId = process.env.TELEGRAM_CHAT_ID;
  let dbRecipients: string[] = [];
  try {
    dbRecipients = getSettings().telegramRecipients;
  } catch {
    console.warn('Telegram: не удалось прочитать настройки получателей.');
  }

  const allRecipients = Array.from(
    new Set([...(envChatId ? [envChatId] : []), ...dbRecipients]),
  );

  if (allRecipients.length === 0) {
    console.warn('Telegram: получатели не настроены. Заказ сохранён без уведомления.');
    return;
  }

  const text = formatOrderMessage(order);

  const results = await Promise.allSettled(
    allRecipients.map((chatId) => sendToRecipient(token, chatId, text)),
  );

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`Telegram: не удалось отправить получателю ${allRecipients[index]}:`, result.reason);
    }
  });
}
