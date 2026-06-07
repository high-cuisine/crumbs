import { Icon } from '@/shared/UI/Icon';
import { classNames } from '@/shared/helpers/classNames';
import styles from './PhoneLink.module.scss';

type PhoneLinkProps = {
  phone: string;
  href: string;
  className?: string;
};

export function PhoneLink({ phone, href, className }: PhoneLinkProps) {
  return (
    <a href={href} className={classNames(styles.link, className)}>
      <Icon name="phone" size={18} />
      <span>{phone}</span>
    </a>
  );
}
