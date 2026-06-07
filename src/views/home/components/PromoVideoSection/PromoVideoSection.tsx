import { Button } from '@/shared/UI/Button';
import { Container } from '@/shared/UI/Container';
import { PromoDecorations } from './components/PromoDecorations';
import { PromoMedia } from './components/PromoMedia';
import { PromoText } from './components/PromoText';
import styles from './PromoVideoSection.module.scss';

export function PromoVideoSection() {
  return (
    <section className={styles.section} aria-labelledby="promo-title">
      <Container className={styles.inner}>
        <PromoMedia />
        <div className={styles.content}>
          <PromoDecorations />
          <PromoText />
          <Button href="#hits" variant="secondary" size="md" className={styles.button}>
            Перейти
          </Button>
        </div>
      </Container>
    </section>
  );
}
