import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getStore } from '../store';
import type { MediaRow } from '../store';
import { UPLOADS_DIR, UPLOADS_URL_PREFIX, ensureDir } from '../store/paths';

export const MAX_UPLOAD_BYTES = 15 * 1024 * 1024; // 15 МБ

const EXT_BY_MIME: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'image/avif': 'avif',
};

export class UploadError extends Error {}

function slugifyBase(name: string): string {
  const base = name.replace(/\.[^.]+$/, '');
  return (
    base
      .toLowerCase()
      .replace(/[^a-z0-9а-яё]+/giu, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'image'
  );
}

/** Сохраняет загруженный файл на диск и регистрирует его в медиатеке. */
export async function saveUploadedFile(file: File): Promise<MediaRow> {
  if (!file || file.size === 0) {
    throw new UploadError('Файл не выбран');
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new UploadError('Файл слишком большой (максимум 15 МБ)');
  }
  const ext = EXT_BY_MIME[file.type];
  if (!ext) {
    throw new UploadError('Неподдерживаемый тип файла. Разрешены PNG, JPG, WEBP, GIF, AVIF, SVG');
  }

  ensureDir(UPLOADS_DIR);
  const id = randomUUID();
  const filename = `${Date.now()}-${id.slice(0, 8)}-${slugifyBase(file.name)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOADS_DIR, filename), buffer);

  const row: MediaRow = {
    id,
    filename,
    originalName: file.name,
    mime: file.type,
    size: file.size,
    width: null,
    height: null,
    url: `${UPLOADS_URL_PREFIX}/${filename}`,
    createdAt: Date.now(),
  };
  getStore().insertMedia(row);
  return row;
}

export function listMedia(): MediaRow[] {
  return getStore().listMedia();
}
