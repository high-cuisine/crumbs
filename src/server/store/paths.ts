import fs from 'node:fs';
import path from 'node:path';

/** Каталог для данных CMS (SQLite/JSON). В Docker монтируется как volume. */
export const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(process.cwd(), 'data');

/** Каталог для загруженных изображений. Отдаётся статикой как /uploads/<file>. */
export const UPLOADS_DIR = process.env.UPLOADS_DIR
  ? path.resolve(process.env.UPLOADS_DIR)
  : path.join(process.cwd(), 'public', 'uploads');

/** Публичный префикс URL для загруженных файлов. */
export const UPLOADS_URL_PREFIX = '/uploads';

export function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}
