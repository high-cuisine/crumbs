import { getPageContent } from '@/server/content/repository';
import { listHitSets } from '@/server/catalog/repository';
import { Footer } from '@/shared/widgets/Footer';
import { PageHeader } from '@/shared/widgets/PageHeader';
import { HitsBanner } from './components/HitsBanner';
import { HitsIntro } from './components/HitsIntro';
import { HitsProductGrid } from './components/HitsProductGrid';
import styles from './HitsPage.module.scss';

export function HitsPage() {
  const data = getPageContent('hits');
  const common = getPageContent('common');
  const hitSets = listHitSets();

  return (
    <div className={styles.page}>
      <PageHeader common={common} />
      <main className={styles.main}>
        <HitsIntro title={data.title} subtitle={data.subtitle} banner={data.banner} />
        <HitsProductGrid sets={hitSets} buyLabel={data.buyLabel} />
        <HitsBanner bottomText={data.bottomText} donut={data.bannerDonut} cat={data.bannerCat} />
      </main>
      <Footer common={common} />
    </div>
  );
}
