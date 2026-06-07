import { Button } from '@/shared/UI/Button';
import { Container } from '@/shared/UI/Container';
import { HeroBackground } from './components/HeroBackground';
import { HeroBannerBottom } from './components/HeroBannerBottom';
import { HeroContent } from './components/HeroContent';
import { HeroDecorations } from './components/HeroDecorations';
import styles from './Hero.module.scss';

export function Hero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.stage}>
        <div className={styles.stageClip}>
          <HeroBackground />

          <Container className={styles.inner}>
            <HeroContent />
            <div className={styles.action}>
              <Button href="#packaging" size="lg">
                Собрать набор
              </Button>
            </div>
          </Container>

          <HeroDecorations />
        </div>

        <HeroBannerBottom />
      </div>
    </section>
  );
}
