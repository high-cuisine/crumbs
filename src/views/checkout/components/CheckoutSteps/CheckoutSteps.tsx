import Link from 'next/link';
import styles from './CheckoutSteps.module.scss';

type Step = 'cart' | 'checkout' | 'done';

type CheckoutStepsProps = {
  current: Step;
};

const STEPS = [
  { id: 'cart' as const, label: 'Корзина', href: '/cart' },
  { id: 'checkout' as const, label: 'Оформление', href: '/checkout' },
  { id: 'done' as const, label: 'Подтверждение', href: '/checkout' },
];

export function CheckoutSteps({ current }: CheckoutStepsProps) {
  const currentIndex = STEPS.findIndex((step) => step.id === current);

  return (
    <nav className={styles.steps} aria-label="Шаги оформления заказа">
      {STEPS.map((step, index) => {
        const done = index < currentIndex;
        const active = step.id === current;
        const content = (
          <>
            <span className={styles.marker} data-done={done || active} data-active={active}>
              {index + 1}
            </span>
            <span className={styles.label} data-active={active}>
              {step.label}
            </span>
          </>
        );

        return (
          <div key={step.id} className={styles.step}>
            {done && step.id !== 'done' ? (
              <Link href={step.href} className={styles.link}>
                {content}
              </Link>
            ) : (
              <div className={styles.link}>{content}</div>
            )}
            {index < STEPS.length - 1 && <span className={styles.line} data-done={done} />}
          </div>
        );
      })}
    </nav>
  );
}
