import { Button } from '@/shared/UI/Button';
import { Container } from '@/shared/UI/Container';
import { PackagingSlider } from '@/shared/widgets/PackagingSlider';
import { PACKAGING_ITEMS } from '@/views/home/helpers';
import { PackagingTitle } from './components/PackagingTitle';
import styles from './PackagingSection.module.scss';

export function PackagingSection() {
  return (
    <section id="packaging" className={styles.section} aria-labelledby="packaging-title">
      <div className={styles.bar}>
        <Container>
          <PackagingTitle />
        </Container>
      </div>

      <Container className={styles.content}>
        <PackagingSlider items={PACKAGING_ITEMS} />
        <div className={styles.action}>
          <Button href="#delivery">Собрать набор</Button>
        </div>
      </Container>
    </section>
  );
}
