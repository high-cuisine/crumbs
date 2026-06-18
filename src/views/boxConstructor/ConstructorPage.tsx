import { getPageContent } from '@/server/content/repository';
import { listCookies } from '@/server/catalog/repository';
import { Container } from '@/shared/UI/Container';
import { Footer } from '@/shared/widgets/Footer';
import { PageHeader } from '@/shared/widgets/PageHeader';
import { ConstructorBanner } from './components/ConstructorBanner';
import { ConstructorIntro } from './components/ConstructorIntro';
import { SizePicker } from './components/SizePicker';
import styles from './ConstructorPage.module.scss';

export function ConstructorPage() {
  const boxes = getPageContent('boxes');
  const { constructor: data } = boxes;
  const common = getPageContent('common');
  const cookies = listCookies();

  return (
    <div className={styles.page}>
      <PageHeader common={common} />
      <main className={styles.main}>
        <ConstructorIntro data={data} />
        <SizePicker
          sizes={data.sizes}
          sets={boxes.sets}
          cookies={cookies}
          cardDoodle={boxes.cardDoodle}
        />
        {data.customNote && (
          <Container>
            <p className={styles.customNote}>{data.customNote}</p>
          </Container>
        )}
        <ConstructorBanner
          bannerText={data.bannerText}
          blobLeft={data.bannerBlobLeft}
          blobRight={data.bannerBlobRight}
        />
      </main>
      <Footer common={common} />
    </div>
  );
}
