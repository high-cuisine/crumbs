import type { DeliveryContent } from '@/server/content/schema';
import { Button } from '@/shared/UI/Button';
import styles from './AddressForm.module.scss';

type AddressFormProps = {
  formTitle: string;
  removeLabel: string;
  submitLabel: string;
  fields: DeliveryContent['fields'];
};

export function AddressForm({ formTitle, removeLabel, submitLabel, fields }: AddressFormProps) {
  return (
    <form className={styles.card}>
      <h2 className={styles.title}>{formTitle}</h2>

      <div className={styles.fields}>
        {fields.map((field) => (
          <input
            key={field.id}
            name={field.id}
            type="text"
            placeholder={field.label}
            aria-label={field.label}
            className={styles.input}
            data-span={field.span}
          />
        ))}
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="outline" className={styles.remove}>
          {removeLabel}
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
