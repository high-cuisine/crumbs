import styles from './HitsGrid.module.scss';

type HitsGridProps = {
  children: React.ReactNode;
};

export function HitsGrid({ children }: HitsGridProps) {
  return <div className={styles.grid}>{children}</div>;
}
