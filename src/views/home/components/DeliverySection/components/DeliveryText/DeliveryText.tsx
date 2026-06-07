import { Heading, Text } from '@/shared/UI/Typography';
import styles from './DeliveryText.module.scss';

const PARAGRAPHS = [
  'Доставка осуществляется курьером в удобный для вас интервал времени.',
  'Стоимость доставки рассчитывается индивидуально в зависимости от адреса.',
  'Возможна доставка в день заказа при наличии свободных слотов.',
];

export function DeliveryText() {
  return (
    <div className={styles.text}>
      <Heading as="h2" id="delivery-title" variant="section" className={styles.title}>
        ДОСТАВКА
      </Heading>
      {PARAGRAPHS.map((paragraph) => (
        <Text as="p" key={paragraph} variant="caption" className={styles.paragraph}>
          {paragraph}
        </Text>
      ))}
    </div>
  );
}
