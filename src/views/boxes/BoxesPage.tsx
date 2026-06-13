import { getPageContent } from '@/server/content/repository';
import { listCookies } from '@/server/catalog/repository';
import { Footer } from '@/shared/widgets/Footer';
import { PageHeader } from '@/shared/widgets/PageHeader';
import { BoxIntro } from './components/BoxIntro';
import { FlavorGrid } from './components/FlavorGrid';
import type { BoxId } from './helpers';
import styles from './BoxesPage.module.scss';

type BoxesPageProps = {
  boxId: BoxId;
};

export function BoxesPage({ boxId }: BoxesPageProps) {
  const data = getPageContent('boxes');
  const common = getPageContent('common');
  const box = data.sets[boxId];
  const cookies = listCookies();

  return (
    <div className={styles.page}>
      <PageHeader common={common} />
      <main className={styles.main}>
        <BoxIntro box={box} />
        <FlavorGrid cookies={cookies} box={box} cardDoodle={data.cardDoodle} />
      </main>
      <Footer common={common} />
    </div>
  );
}
