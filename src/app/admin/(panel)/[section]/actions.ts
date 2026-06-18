'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { SESSION_COOKIE, verifySessionToken } from '@/server/auth/session';
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
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    redirect('/admin/login');
  }

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
