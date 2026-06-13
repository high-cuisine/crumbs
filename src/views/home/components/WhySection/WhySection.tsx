import type { HomeContent } from '@/server/content/schema';
import { Container } from '@/shared/UI/Container';
import { WhyDecorations } from './components/WhyDecorations';
import { WhyGallery } from './components/WhyGallery';
import { WhyText } from './components/WhyText';
import styles from './WhySection.module.scss';

type WhySectionProps = {
  data: HomeContent['why'];
};

export function WhySection({ data }: WhySectionProps) {
  return (
    <section className={styles.section} aria-labelledby="why-title">
      <Container className={styles.inner}>
        <WhyDecorations
          hook={data.decorHook}
          squiggleLeft={data.decorSquiggleLeft}
          squiggleRight={data.decorSquiggleRight}
        />
        <WhyText title={data.title} body={data.body} />
        <WhyGallery items={data.gallery} />
      </Container>
    </section>
  );
}
