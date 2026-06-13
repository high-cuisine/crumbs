import type { Cookie, CookieSet } from '../catalog/schema';

export type MediaRow = {
  id: string;
  filename: string;
  originalName: string;
  mime: string;
  size: number;
  width: number | null;
  height: number | null;
  url: string;
  createdAt: number;
};

export type OrderStatus = 'new' | 'processing' | 'done' | 'cancelled';

export type OrderItem = {
  name: string;
  price: number;
  quantity: number;
  cookieCount: number;
  kind: string;
};

export type OrderRecord = {
  id: string;
  createdAt: number;
  customer: {
    name: string;
    phone: string;
    address: string;
    entrance: string;
    doorCode: string;
    floor: string;
    apartment: string;
    comment: string;
  };
  items: OrderItem[];
  total: number;
  status: OrderStatus;
};

export type AppSettings = {
  telegramRecipients: string[];
};

/**
 * Хранилище контента и медиа. Абстрагирует бэкенд: основной адаптер — SQLite
 * (better-sqlite3), фолбэк — JSON-файл (когда нативный модуль недоступен).
 */
export interface ContentStore {
  /** Имя адаптера для диагностики. */
  readonly kind: 'sqlite' | 'json';
  /** Сырой JSON-документ страницы по ключу (или null). */
  getContent(pageKey: string): string | null;
  /** Записать/обновить JSON-документ страницы. */
  setContent(pageKey: string, json: string): void;
  /** Список загруженных медиа (свежие первыми). */
  listMedia(): MediaRow[];
  /** Добавить запись о загруженном файле. */
  insertMedia(row: MediaRow): void;
  /** Каталог: все печенья. */
  listCookies(): Cookie[];
  /** Каталог: печенье по id. */
  getCookie(id: string): Cookie | null;
  /** Каталог: сохранить печенье. */
  upsertCookie(cookie: Cookie): void;
  /** Каталог: удалить печенье. */
  deleteCookie(id: string): void;
  /** Каталог: все наборы. */
  listSets(): CookieSet[];
  /** Каталог: набор по id. */
  getSet(id: string): CookieSet | null;
  /** Каталог: сохранить набор. */
  upsertSet(set: CookieSet): void;
  /** Каталог: удалить набор. */
  deleteSet(id: string): void;
  /** Каталог: увеличить счётчик заказов набора. */
  incrementSetOrderCount(id: string): void;
  /** Заказы: список всех заказов (свежие первыми). */
  listOrders(): OrderRecord[];
  /** Заказы: сохранить новый заказ, вернуть запись с id и createdAt. */
  saveOrder(data: Omit<OrderRecord, 'id' | 'createdAt'>): OrderRecord;
  /** Заказы: обновить статус заказа. */
  updateOrderStatus(id: string, status: OrderStatus): void;
  /** Настройки: получить настройки приложения. */
  getSettings(): AppSettings;
  /** Настройки: сохранить настройки приложения. */
  saveSettings(settings: AppSettings): void;
}
