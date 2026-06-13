import { Footer } from '@/shared/widgets/Footer';
import { Header } from '@/shared/widgets/Header';
import { getPageContent } from '@/server/content/repository';
import { DeliverySection } from './components/DeliverySection';
import { Hero } from './components/Hero';
import { HitsSection } from './components/HitsSection';
import { PackagingSection } from './components/PackagingSection';
import { PaymentSection } from './components/PaymentSection';
import { PromoVideoSection } from './components/PromoVideoSection';
import { WhySection } from './components/WhySection';
import styles from './HomePage.module.scss';

export function HomePage() {
  const content = getPageContent('home');
  const common = getPageContent('common');

  return (
    <div className={styles.page}>
      <Header cartCount={2} common={common} />
      <main className={styles.main}>
        <Hero data={content.hero} />
        <WhySection data={content.why} />
        <PromoVideoSection data={content.promo} />
        <HitsSection data={content.hits} />
        <PackagingSection data={content.packaging} />
        <DeliverySection data={content.delivery} />
        <PaymentSection data={content.payment} />
      </main>
      <Footer common={common} />
    </div>
  );
}
