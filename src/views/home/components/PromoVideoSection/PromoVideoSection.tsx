import type { HomeContent } from '@/server/content/schema';
import { Button } from '@/shared/UI/Button';
import { Container } from '@/shared/UI/Container';
import { PromoDecorations } from './components/PromoDecorations';
import { PromoMedia } from './components/PromoMedia';
import { PromoText } from './components/PromoText';
import styles from './PromoVideoSection.module.scss';

type PromoVideoSectionProps = {
  data: HomeContent['promo'];
};

export function PromoVideoSection({ data }: PromoVideoSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="promo-title">
      <Container className={styles.inner}>
        <PromoMedia media={data.media} />
        <div className={styles.content}>
          <PromoDecorations ring={data.decorRing} />
          <PromoText title={data.title} subtitle={data.subtitle} description={data.description} />
          <Button href={data.button.href} variant="secondary" size="md" className={styles.button}>
            {data.button.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
