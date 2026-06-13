'use server';

import { revalidatePath } from 'next/cache';
import { savePageContent } from '@/server/content/repository';
import { PAGE_KEYS, type PageKey } from '@/server/content/schema';

type SaveResult = { ok: boolean; error?: string };

const REVALIDATE_PATHS: Record<PageKey, string[]> = {
  common: ['/', '/hits', '/boxes', '/boxes/mini', '/boxes/signature', '/boxes/party', '/delivery', '/cart'],
  home: ['/'],
  hits: ['/hits'],
  boxes: ['/boxes', '/boxes/mini', '/boxes/signature', '/boxes/party'],
  delivery: ['/delivery'],
  cart: ['/cart', '/checkout'],
};

export async function saveSection(section: string, json: string): Promise<SaveResult> {
  if (!PAGE_KEYS.includes(section as PageKey)) {
    return { ok: false, error: 'Неизвестный раздел' };
  }

  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    return { ok: false, error: 'Некорректный JSON' };
  }

  try {
    savePageContent(section as PageKey, data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Ошибка валидации';
    return { ok: false, error: message.slice(0, 300) };
  }

  for (const path of REVALIDATE_PATHS[section as PageKey]) {
    revalidatePath(path);
  }

  return { ok: true };
}
