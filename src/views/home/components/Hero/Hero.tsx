import type { HomeContent } from '@/server/content/schema';
import { Button } from '@/shared/UI/Button';
import { Container } from '@/shared/UI/Container';
import { Reveal } from '@/shared/UI/Reveal';
import { HeroBackground } from './components/HeroBackground';
import { HeroBannerBottom } from './components/HeroBannerBottom';
import { HeroContent } from './components/HeroContent';
import { HeroDecorations } from './components/HeroDecorations';
import styles from './Hero.module.scss';

type HeroProps = {
  data: HomeContent['hero'];
};

export function Hero({ data }: HeroProps) {
  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.stage}>
        <div className={styles.stageClip}>
          <HeroBackground wave={data.bgWave} />

          <Container className={styles.inner}>
            <HeroContent title={data.title} subtitle={data.subtitle} />
            <Reveal className={styles.action} direction="up" delay={320}>
              <Button href={data.button.href} size="lg">
                {data.button.label}
              </Button>
            </Reveal>
          </Container>

          <HeroDecorations data={data} />
        </div>

        <HeroBannerBottom ring={data.bannerRing} />
      </div>
    </section>
  );
}
