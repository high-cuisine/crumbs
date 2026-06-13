'use client';

import type { BoxesContent } from '@/server/content/schema';
import type { Cookie } from '@/server/catalog/schema';
import { Container } from '@/shared/UI/Container';
import { useBoxModal } from '@/views/boxConstructor/hooks';
import { BoxModal } from '../BoxModal';
import { SizeCard } from '../SizeCard';
import styles from './SizePicker.module.scss';

type SizePickerProps = {
  sizes: BoxesContent['constructor']['sizes'];
  sets: BoxesContent['sets'];
  cookies: Cookie[];
  cardDoodle: string;
};

export function SizePicker({ sizes, sets, cookies, cardDoodle }: SizePickerProps) {
  const { openId, open, close } = useBoxModal();
  const activeSet = openId ? sets[openId as keyof BoxesContent['sets']] : null;

  return (
    <Container className={styles.section}>
      <div className={styles.grid}>
        {sizes.map((size) => (
          <SizeCard
            key={size.id}
            name={size.name}
            image={size.image}
            onSelect={() => open(size.id)}
          />
        ))}
      </div>

      {activeSet && (
        <BoxModal set={activeSet} cookies={cookies} cardDoodle={cardDoodle} onClose={close} />
      )}
    </Container>
  );
}
