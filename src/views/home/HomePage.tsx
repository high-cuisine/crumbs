import { Footer } from '@/shared/widgets/Footer';
import { Header } from '@/shared/widgets/Header';
import { DeliverySection } from './components/DeliverySection';
import { Hero } from './components/Hero';
import { HitsSection } from './components/HitsSection';
import { PackagingSection } from './components/PackagingSection';
import { PaymentSection } from './components/PaymentSection';
import { PromoVideoSection } from './components/PromoVideoSection';
import { WhySection } from './components/WhySection';
import styles from './HomePage.module.scss';

export function HomePage() {
  return (
    <div className={styles.page}>
      <Header cartCount={2} />
      <main className={styles.main}>
        <Hero />
        <WhySection />
        <PromoVideoSection />
        <HitsSection />
        <PackagingSection />
        <DeliverySection />
        <PaymentSection />
      </main>
      <Footer />
    </div>
  );
}
