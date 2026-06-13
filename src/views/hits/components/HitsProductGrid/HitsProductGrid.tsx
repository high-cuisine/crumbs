import type { ResolvedCookieSet } from '@/server/catalog/schema';
import { Container } from '@/shared/UI/Container';
import { HitsProductCard } from '../HitsProductCard';
import styles from './HitsProductGrid.module.scss';

type HitsProductGridProps = {
  sets: ResolvedCookieSet[];
  buyLabel: string;
};

export function HitsProductGrid({ sets, buyLabel }: HitsProductGridProps) {
  return (
    <Container className={styles.section}>
      <div className={styles.grid}>
        {sets.map((set) => (
          <HitsProductCard key={set.id} set={set} buyLabel={buyLabel} />
        ))}
      </div>
    </Container>
  );
}
