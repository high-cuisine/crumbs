import { getStore } from '../store';
import { defaultContent } from './defaults';
import { contentSchema, type PageContentMap, type PageKey } from './schema';

/**
 * Возвращает контент страницы: из хранилища (если сохранён и валиден),
 * иначе — дефолтный (текущий контент сайта). Так сайт работает до первой правки.
 */
export function getPageContent<K extends PageKey>(key: K): PageContentMap[K] {
  const raw = getStore().getContent(key);
  if (raw) {
    try {
      const parsed = contentSchema[key].safeParse(JSON.parse(raw));
      if (parsed.success) return parsed.data as PageContentMap[K];
    } catch {
      // повреждённый JSON — откатываемся на дефолт
    }
  }
  return defaultContent[key];
}

/**
 * Валидирует вход по zod-схеме и сохраняет. Возвращает нормализованный контент.
 * Бросает ZodError при некорректных данных.
 */
export function savePageContent<K extends PageKey>(key: K, data: unknown): PageContentMap[K] {
  const parsed = contentSchema[key].parse(data) as PageContentMap[K];
  getStore().setContent(key, JSON.stringify(parsed));
  return parsed;
}
