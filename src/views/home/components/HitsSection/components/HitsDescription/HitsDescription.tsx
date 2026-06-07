import { Text } from '@/shared/UI/Typography';
import styles from './HitsDescription.module.scss';

export function HitsDescription() {
  return (
    <div className={styles.description}>
      <Text as="p" variant="caption" color="dark">
        Выберите вкусы
      </Text>
      <Text as="p" variant="caption" color="dark">
        Соберите сочетание, которое хочется попробовать именно сейчас.
      </Text>
      <Text as="p" variant="caption" color="dark">
        Нажмите на карточку, чтобы увидеть начинку, состав, кбжу и детали вкуса.
      </Text>
      <Text as="p" variant="caption" color="dark">
        Каждый вкус — с характером и своей текстурой.
      </Text>
    </div>
  );
}
