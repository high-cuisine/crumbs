import Image from 'next/image';
import type { DeliveryContent } from '@/server/content/schema';
import { Container } from '@/shared/UI/Container';
import { AddressForm } from '../AddressForm';
import styles from './DeliveryMap.module.scss';

type DeliveryMapProps = {
  map: DeliveryContent['map'];
  formTitle: string;
  removeLabel: string;
  submitLabel: string;
  fields: DeliveryContent['fields'];
};

export function DeliveryMap({ map, formTitle, removeLabel, submitLabel, fields }: DeliveryMapProps) {
  return (
    <Container className={styles.section}>
      <div className={styles.stage}>
        <Image
          src={map.src}
          alt={map.alt}
          width={1086}
          height={732}
          className={styles.mapImage}
        />
        <div className={styles.formWrap}>
          <AddressForm
            formTitle={formTitle}
            removeLabel={removeLabel}
            submitLabel={submitLabel}
            fields={fields}
          />
        </div>
      </div>
    </Container>
  );
}
