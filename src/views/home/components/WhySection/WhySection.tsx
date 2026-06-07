import { Container } from '@/shared/UI/Container';
import { WhyDecorations } from './components/WhyDecorations';
import { WhyGallery } from './components/WhyGallery';
import { WhyText } from './components/WhyText';
import styles from './WhySection.module.scss';

export function WhySection() {
  return (
    <section className={styles.section} aria-labelledby="why-title">
      <Container className={styles.inner}>
        <WhyDecorations />
        <WhyText />
        <WhyGallery />
      </Container>
    </section>
  );
}
