import { getPageContent } from '@/server/content/repository';
import { Container } from '@/shared/UI/Container';
import { Footer } from '@/shared/widgets/Footer';
import { PageHeader } from '@/shared/widgets/PageHeader';
import { CheckoutContent } from './components/CheckoutContent';
import styles from './CheckoutPage.module.scss';

export function CheckoutPage() {
  const common = getPageContent('common');

  return (
    <div className={styles.page}>
      <PageHeader common={common} />
      <main className={styles.main}>
        <Container className={styles.inner}>
          <h1 className={styles.title}>Оформление заказа</h1>
          <CheckoutContent backLabel="Назад к корзине" />
        </Container>
      </main>
      <Footer common={common} />
    </div>
  );
}
