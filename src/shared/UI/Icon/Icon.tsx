import { classNames } from '@/shared/helpers/classNames';
import styles from './Icon.module.scss';

export type IconName =
  | 'cart'
  | 'user'
  | 'phone'
  | 'play'
  | 'arrow-left'
  | 'arrow-right'
  | 'vk'
  | 'telegram'
  | 'menu';

type IconProps = {
  name: IconName;
  className?: string;
  size?: number;
};

const paths: Record<IconName, React.ReactNode> = {
  cart: (
    <>
      <path d="M6 6h14l-1.5 9H7.5L6 6Z" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <circle cx="9" cy="19" r="1.5" fill="currentColor" />
      <circle cx="17" cy="19" r="1.5" fill="currentColor" />
      <path d="M2 6h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M4 20c1.5-4 6.5-4 8-4s6.5 0 8 4" stroke="currentColor" strokeWidth="1.8" fill="none" />
    </>
  ),
  phone: (
    <path
      d="M6.5 4.5c2.8 0 5.5 1 7.6 3.1 2.1 2.1 3.1 4.8 3.1 7.6 0 .6-.4 1-1 1h-2.4c-.5 0-.9-.3-1-.8-.2-.8-.5-1.6-.9-2.3-.2-.4-.1-.9.2-1.2l1-1c-1.6-3-3.9-5.3-6.9-6.9l-1 1c-.3.3-.8.4-1.2.2-.7-.4-1.5-.7-2.3-.9-.5-.1-.8-.5-.8-1V5.5c0-.6.4-1 1-1Z"
      fill="currentColor"
    />
  ),
  play: (
    <path d="M9 7.5 17 12 9 16.5V7.5Z" fill="currentColor" />
  ),
  'arrow-left': (
    <path d="M14 6 8 12l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
  ),
  'arrow-right': (
    <path d="M10 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
  ),
  vk: (
    <path
      d="M4.5 8.5c4.5-.5 7.5-2.5 9-6 .5 4 2.5 6.5 5.5 7.5-2 1.5-3.5 2.5-4 3.5 3-.5 5.5-2 7-4.5-2 3-5 5.5-9 7 7.5-1 12-6 12.5-13.5-3 2-5.5 3-7.5 3.5 2.5-2.5 4-5 4.5-8.5-2 2.5-4.5 4.5-7.5 5.5Z"
      fill="currentColor"
    />
  ),
  telegram: (
    <path
      d="M5 11.5 17.5 5.5 14 18.5l-2.5-4.5L5 11.5Zm0 0 5.5 1.5"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinejoin="round"
    />
  ),
  menu: (
    <>
      <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
};

export function Icon({ name, className, size = 24 }: IconProps) {
  return (
    <svg
      className={classNames(styles.icon, className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
