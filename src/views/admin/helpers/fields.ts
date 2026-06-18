const IMAGE_EXT = /\.(png|jpe?g|svg|webp|gif|avif)$/i;

// Ключи, которые всегда трактуем как изображение (даже если значение пустое).
const IMAGE_KEY_HINTS = [
  'src',
  'image',
  'logo',
  'icon',
  'banner',
  'hero',
  'mockup',
  'map',
  'media',
  'doodle',
  'blob',
  'cookie',
  'scribble',
  'ring',
  'zigzag',
  'crumb',
  'truck',
  'star',
  'path',
  'wave',
  'illustration',
  'decor',
  'donut',
  'cat',
];

/** Поле-изображение: по расширению значения или по подсказке в имени ключа. */
export function isImageField(key: string, value: string): boolean {
  if (IMAGE_EXT.test(value)) return true;
  const lower = key.toLowerCase();
  return IMAGE_KEY_HINTS.some((hint) => lower.includes(hint));
}

/** Многострочное текстовое поле. */
export function isMultiline(value: string): boolean {
  return value.includes('\n') || value.length > 60;
}

/** Массив строк — рендерится в компактном режиме (без вложенного fieldset). */
export function isStringArray(value: unknown[]): boolean {
  return value.length === 0 || value.every((item) => typeof item === 'string');
}

const LABELS: Record<string, string> = {
  site: 'Контакты сайта',
  name: 'Название',
  phone: 'Телефон',
  phoneHref: 'Ссылка телефона (tel:)',
  email: 'Email',
  nav: 'Навигация',
  socials: 'Соцсети',
  vk: 'ВКонтакте',
  telegram: 'Telegram',
  header: 'Шапка',
  footer: 'Подвал',
  logo: 'Логотип',
  title: 'Заголовок',
  subtitle: 'Подзаголовок',
  body: 'Текст',
  description: 'Описание',
  note: 'Примечание',
  accent: 'Акцентный текст',
  button: 'Кнопка',
  label: 'Подпись',
  href: 'Ссылка',
  hero: 'Hero',
  why: 'Почему мы',
  promo: 'Промо-видео',
  hits: 'Хиты',
  packaging: 'Упаковка',
  delivery: 'Доставка',
  payment: 'Оплата',
  cart: 'Корзина',
  products: 'Товары',
  gallery: 'Галерея',
  items: 'Элементы',
  sizes: 'Размеры наборов',
  sets: 'Наборы',
  flavors: 'Вкусы',
  fields: 'Поля формы',
  paragraphs: 'Абзацы',
  image: 'Изображение',
  alt: 'Alt (описание картинки)',
  src: 'Изображение',
  mockup: 'Изображение набора',
  mockupAlt: 'Alt изображения',
  banner: 'Баннер',
  map: 'Карта',
  media: 'Медиа',
  illustration: 'Иллюстрация',
  bottomText: 'Нижний текст',
  buyLabel: 'Текст кнопки покупки',
  buyHref: 'Ссылка покупки',
  cartLabel: 'Текст кнопки корзины',
  cartHref: 'Ссылка корзины',
  bannerText: 'Текст баннера',
  formTitle: 'Заголовок формы',
  removeLabel: 'Текст «удалить»',
  submitLabel: 'Текст «отправить»',
  linkLabel: 'Текст ссылки',
  linkHref: 'Ссылка',
  size: 'Кол-во штук',
  constructor: 'Конструктор',
  span: 'Ширина поля (full/half)',
  crumbs: 'Крошки',
  price: 'Цена (₽)',
  count: 'Количество',
  required: 'Обязательное поле',
  placeholder: 'Подсказка в поле',
  type: 'Тип поля',
  schedule: 'График работы',
  scheduleTitle: 'Заголовок расписания',
  steps: 'Шаги оформления заказа',
  stepsTitle: 'Заголовок шагов',
  customNote: 'Текст об индивидуальном заказе',
  mini: 'Мини-набор',
  signature: 'Фирменный набор',
  party: 'Праздничный набор',
};

/** Человекочитаемая подпись для ключа. */
export function humanizeKey(key: string): string {
  if (LABELS[key]) return LABELS[key];
  const spaced = key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

const SECTION_TITLES: Record<string, string> = {
  common: 'Шапка, подвал и контакты',
  home: 'Главная страница',
  hits: 'Страница «Хиты»',
  boxes: 'Страница «Коробки»',
  delivery: 'Страница «Доставка»',
  cart: 'Страница «Корзина»',
};

const SECTION_DESCRIPTIONS: Record<string, string> = {
  common: 'Телефон, email, ссылки на соцсети и навигационные ссылки в шапке и подвале сайта.',
  home: 'Главная страница: большой баннер, блок «Почему мы», промо-видео, блок хитов.',
  hits: 'Страница «Хиты»: заголовок, баннер, список продуктов с фото и описаниями.',
  boxes: 'Страница «Коробки»: наборы с ценами, конструктор, подсказка об индивидуальных заказах.',
  delivery: 'Страница «Доставка»: условия, расписание работы, шаги оформления заказа.',
  cart: 'Страница «Корзина»: тексты формы заказа и кнопок.',
};

export const ADMIN_SECTIONS = [
  'common',
  'home',
  'hits',
  'boxes',
  'delivery',
  'cart',
] as const;

export function sectionTitle(key: string): string {
  return SECTION_TITLES[key] ?? key;
}

export function sectionDescription(key: string): string {
  return SECTION_DESCRIPTIONS[key] ?? '';
}
