import type { HomeContent } from '@/server/content/schema';
import { Button } from '@/shared/UI/Button';
import { Container } from '@/shared/UI/Container';
import { Reveal } from '@/shared/UI/Reveal';
import { SectionTitle } from '@/shared/UI/SectionTitle';
import { HitsCarousel } from './components/HitsCarousel';
import { HitsDecorations } from './components/HitsDecorations';
import { HitsGrid } from './components/HitsGrid';
import { HitsProductItem } from './components/HitsProductItem';
import styles from './HitsSection.module.scss';

type HitsSectionProps = {
  data: HomeContent['hits'];
};

export function HitsSection({ data }: HitsSectionProps) {
  return (
    <section id="hits" className={styles.section} aria-labelledby="hits-title">
      <HitsDecorations blobLeft={data.decorBlobLeft} blobRight={data.decorBlobRight} />
      <Container className={styles.inner}>
        <Reveal direction="up">
          <SectionTitle className={styles.title} align="center">
            {data.title}
          </SectionTitle>
        </Reveal>
        <HitsGrid>
          {data.products.map((product) => (
            <HitsProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              overlayImage={product.overlayImage}
            />
          ))}
        </HitsGrid>
        <HitsCarousel products={data.products} />
        <Reveal className={styles.action} direction="up">
          <Button href={data.button.href} size="lg">
            {data.button.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
