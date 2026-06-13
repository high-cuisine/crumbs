import { notFound } from 'next/navigation';
import { getCookie } from '@/server/catalog/repository';
import { getPageContent } from '@/server/content/repository';
import { Container } from '@/shared/UI/Container';
import { Footer } from '@/shared/widgets/Footer';
import { PageHeader } from '@/shared/widgets/PageHeader';
import { BackButton } from './components/BackButton';
import { FlavorGallery } from './components/FlavorGallery';
import { FlavorBuy } from './components/FlavorBuy';
import { FlavorAccordions } from './components/FlavorAccordions';
import { flavorToSet } from './helpers';
import styles from './FlavorPage.module.scss';

type FlavorPageProps = {
  id: string;
};

export function FlavorPage({ id }: FlavorPageProps) {
  const cookie = getCookie(id);
  if (!cookie) notFound();

  const common = getPageContent('common');
  const set = flavorToSet(cookie);

  return (
    <div className={styles.page}>
      <PageHeader common={common} />
      <main className={styles.main}>
        <Container className={styles.topBar}>
          <BackButton />
        </Container>
        <Container className={styles.inner}>
          <h1 className={styles.name}>{cookie.name}</h1>
          <FlavorGallery images={cookie.images} alt={cookie.name} />
          <FlavorBuy cookie={cookie} set={set} />
          <FlavorAccordions cookie={cookie} />
        </Container>
      </main>
      <Footer common={common} />
    </div>
  );
}
