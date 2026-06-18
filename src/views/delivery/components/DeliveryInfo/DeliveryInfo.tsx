import { Container } from '@/shared/UI/Container';
import styles from './DeliveryInfo.module.scss';

type DeliveryInfoProps = {
  scheduleTitle?: string;
  schedule?: string[];
  stepsTitle?: string;
  steps?: string[];
};

export function DeliveryInfo({ scheduleTitle, schedule, stepsTitle, steps }: DeliveryInfoProps) {
  if (!schedule?.length && !steps?.length) return null;

  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        {schedule?.length && scheduleTitle && (
          <div className={styles.block}>
            <h2 className={styles.title}>{scheduleTitle}</h2>
            <ul className={styles.list}>
              {schedule.map((item, i) => (
                <li key={i} className={styles.item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {steps?.length && stepsTitle && (
          <div className={styles.block}>
            <h2 className={styles.title}>{stepsTitle}</h2>
            <ol className={styles.steps}>
              {steps.map((step, i) => (
                <li key={i} className={styles.step}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  <span className={styles.stepText}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </Container>
    </section>
  );
}
