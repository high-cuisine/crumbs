import type { HomeContent } from '@/server/content/schema';
import { Button } from '@/shared/UI/Button';
import { Container } from '@/shared/UI/Container';
import { Reveal } from '@/shared/UI/Reveal';
import { PackagingSlider } from '@/shared/widgets/PackagingSlider';
import { PackagingTitle } from './components/PackagingTitle';
import styles from './PackagingSection.module.scss';

type PackagingSectionProps = {
  data: HomeContent['packaging'];
};

export function PackagingSection({ data }: PackagingSectionProps) {
  const sliderItems = data.items.map((item, index) => ({
    id: String(index),
    image: item.src,
    alt: item.alt,
  }));

  return (
    <section id="packaging" className={styles.section} aria-labelledby="packaging-title">
      <div className={styles.bar}>
        <Container>
          <Reveal direction="up">
            <PackagingTitle title={data.title} />
          </Reveal>
        </Container>
      </div>

      <Container className={styles.content}>
        <Reveal direction="up">
          <PackagingSlider items={sliderItems} />
        </Reveal>
        <Reveal className={styles.action} direction="up">
          <Button href={data.button.href}>{data.button.label}</Button>
        </Reveal>
      </Container>
    </section>
  );
}
