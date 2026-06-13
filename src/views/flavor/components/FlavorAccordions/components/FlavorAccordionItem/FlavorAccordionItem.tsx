'use client';

import { useState } from 'react';
import styles from './FlavorAccordionItem.module.scss';

type FlavorAccordionItemProps = {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

export function FlavorAccordionItem({
  title,
  defaultOpen = true,
  children,
}: FlavorAccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={styles.item} data-open={open}>
      <button
        type="button"
        className={styles.header}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className={styles.title}>{title}:</span>
        <span className={styles.chevron} data-open={open} aria-hidden="true" />
      </button>
      <div className={styles.body} data-open={open} aria-hidden={!open}>
        <div className={styles.bodyInner}>{children}</div>
      </div>
    </div>
  );
}
