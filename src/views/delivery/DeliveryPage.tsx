import { getPageContent } from '@/server/content/repository';
import { Footer } from '@/shared/widgets/Footer';
import { PageHeader } from '@/shared/widgets/PageHeader';
import { DeliveryHero } from './components/DeliveryHero';
import { DeliveryMap } from './components/DeliveryMap';
import styles from './DeliveryPage.module.scss';

export function DeliveryPage() {
  const data = getPageContent('delivery');
  const common = getPageContent('common');

  return (
    <div className={styles.page}>
      <PageHeader common={common} />
      <main className={styles.main}>
        <DeliveryHero title={data.title} banner={data.banner} />
        <DeliveryMap
          map={data.map}
          formTitle={data.formTitle}
          removeLabel={data.removeLabel}
          submitLabel={data.submitLabel}
          fields={data.fields}
        />
      </main>
      <Footer common={common} />
    </div>
  );
}
