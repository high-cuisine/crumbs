import type { Cookie } from '@/server/catalog/schema';
import { FLAVOR_LABELS } from '@/views/flavor/helpers';
import { FlavorAccordionItem } from './components/FlavorAccordionItem';
import styles from './FlavorAccordions.module.scss';

type FlavorAccordionsProps = {
  cookie: Cookie;
};

export function FlavorAccordions({ cookie }: FlavorAccordionsProps) {
  const { nutrition } = cookie;

  return (
    <div className={styles.list}>
      {cookie.description && (
        <FlavorAccordionItem title={FLAVOR_LABELS.description}>
          {cookie.description}
        </FlavorAccordionItem>
      )}

      {cookie.structure && (
        <FlavorAccordionItem title={FLAVOR_LABELS.texture}>
          {cookie.structure}
        </FlavorAccordionItem>
      )}

      <FlavorAccordionItem title={FLAVOR_LABELS.composition}>
        {cookie.composition && <p className={styles.text}>{cookie.composition}</p>}
        {nutrition && (
          <ul className={styles.nutrition}>
            <li className={styles.nutritionTitle}>{FLAVOR_LABELS.nutritionTitle}</li>
            <li>{nutrition.calories} ккал</li>
            <li>Белки {nutrition.protein} г</li>
            <li>Жиры {nutrition.fat} г</li>
            <li>Углеводы {nutrition.carbs} г</li>
          </ul>
        )}
      </FlavorAccordionItem>
    </div>
  );
}
