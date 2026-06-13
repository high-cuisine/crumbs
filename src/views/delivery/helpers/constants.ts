export const DELIVERY = {
  title: 'Доставка',
  formTitle: 'Изменение адреса',
  removeLabel: 'Удалить',
  submitLabel: 'Купить',
} as const;

// Поля формы адреса: full — на всю ширину, half — половина строки.
export const ADDRESS_FIELDS = [
  { id: 'address', label: 'Город, улица, дом', span: 'full' },
  { id: 'entrance', label: 'Подъезд', span: 'half' },
  { id: 'doorCode', label: 'Код двери', span: 'half' },
  { id: 'floor', label: 'Этаж', span: 'half' },
  { id: 'apartment', label: 'Квартира', span: 'half' },
  { id: 'comment', label: 'Комментарий к адресу', span: 'full' },
] as const;
