import type { CartItem } from './types';

export type OrderFormData = {
  name: string;
  phone: string;
  address: string;
  entrance: string;
  doorCode: string;
  floor: string;
  apartment: string;
  comment: string;
};

export type OrderPayload = {
  customer: OrderFormData;
  items: CartItem[];
  total: number;
};

export const ORDER_FIELD_LABELS: Record<keyof OrderFormData, string> = {
  name: 'Имя',
  phone: 'Телефон',
  address: 'Город, улица, дом',
  entrance: 'Подъезд',
  doorCode: 'Код двери',
  floor: 'Этаж',
  apartment: 'Квартира',
  comment: 'Комментарий к заказу',
};
