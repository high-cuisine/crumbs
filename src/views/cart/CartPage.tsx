import { getPageContent } from '@/server/content/repository';
import { Footer } from '@/shared/widgets/Footer';
import { PageHeader } from '@/shared/widgets/PageHeader';
import { Container } from '@/shared/UI/Container';
import { CartContent } from './components/CartContent';
import styles from './CartPage.module.scss';

export function CartPage() {
  const data = getPageContent('cart');
  const common = getPageContent('common');

  return (
    <div className={styles.page}>
      <PageHeader common={common} />
      <main className={styles.main}>
        <Container className={styles.inner}>
          <CartContent content={data} />
        </Container>
      </main>
      <Footer common={common} />
    </div>
  );
}
