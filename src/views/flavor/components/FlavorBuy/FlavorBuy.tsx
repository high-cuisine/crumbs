import type { Cookie, ResolvedCookieSet } from '@/server/catalog/schema';
import { AddSetToCartButton } from '@/shared/cart';
import { FLAVOR_LABELS } from '@/views/flavor/helpers';
import styles from './FlavorBuy.module.scss';

type FlavorBuyProps = {
  cookie: Cookie;
  set: ResolvedCookieSet;
};

export function FlavorBuy({ cookie, set }: FlavorBuyProps) {
  return (
    <div className={styles.buy}>
      <div className={styles.meta}>
        {cookie.subtitle && <p className={styles.subtitle}>{cookie.subtitle}</p>}
        <p className={styles.price}>
          {cookie.price.toLocaleString('ru-RU')} {FLAVOR_LABELS.priceSuffix}
        </p>
      </div>
      <AddSetToCartButton
        set={set}
        label={FLAVOR_LABELS.buy}
        className={styles.action}
        redirectToCart={false}
      />
    </div>
  );
}
