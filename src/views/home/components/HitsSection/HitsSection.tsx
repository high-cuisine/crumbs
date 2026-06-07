import { Button } from '@/shared/UI/Button';
import { Container } from '@/shared/UI/Container';
import { SectionTitle } from '@/shared/UI/SectionTitle';
import { HITS_PRODUCTS } from '@/views/home/helpers';
import { HitsCarousel } from './components/HitsCarousel';
import { HitsDecorations } from './components/HitsDecorations';
import { HitsGrid } from './components/HitsGrid';
import { HitsProductItem } from './components/HitsProductItem';
import styles from './HitsSection.module.scss';

export function HitsSection() {
  return (
    <section id="hits" className={styles.section} aria-labelledby="hits-title">
      <HitsDecorations />
      <Container className={styles.inner}>
        <SectionTitle className={styles.title} align="center">
          ХИТЫ
        </SectionTitle>
        <HitsGrid>
          {HITS_PRODUCTS.map((product) => (
            <HitsProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              overlayImage={'overlayImage' in product ? product.overlayImage : undefined}
            />
          ))}
        </HitsGrid>
        <HitsCarousel products={HITS_PRODUCTS} />
        <div className={styles.action}>
          <Button href="#packaging" size="lg">
            Посмотреть хиты
          </Button>
        </div>
      </Container>
    </section>
  );
}
