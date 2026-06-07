import { Heading, Text } from '@/shared/UI/Typography';
import styles from './WhyText.module.scss';

const BODY = `Мы создаём печенье, которое хочется разломить. Каждый вкус — это баланс текстуры, начинки и эмоции.

Без компромиссов и «Просто сладко». —

та самая тягучая текстура NY cookies — много начинки внутри, а не «Намёк» — вкус, который не надо доедать — его хочется — готовим небольшими партиями, а не на поток — можно собрать набор под себя WOW! CRUMBS — когда хочется не просто попробовать, а вернуться снова.`;

export function WhyText() {
  return (
    <div className={styles.textBlock}>
      <Heading as="h2" id="why-title" className={styles.title}>
        Почему WOW CRUMBS?
      </Heading>
      <Text as="p" variant="body" className={styles.body}>
        {BODY}
      </Text>
    </div>
  );
}
