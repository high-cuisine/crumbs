'use client';

import type { BoxesContent } from '@/server/content/schema';
import { Container } from '@/shared/UI/Container';
import { useRouter } from 'next/navigation';
import { SizeCard } from '../SizeCard';
import styles from './SizeGrid.module.scss';

type SizeGridProps = {
  sizes: BoxesContent['constructor']['sizes'];
};

export function SizeGrid({ sizes }: SizeGridProps) {
  const router = useRouter();

  return (
    <Container className={styles.section}>
      <div className={styles.grid}>
        {sizes.map((size) => (
          <SizeCard
            key={size.id}
            name={size.name}
            image={size.image}
            onSelect={() => router.push(size.href)}
          />
        ))}
      </div>
    </Container>
  );
}
