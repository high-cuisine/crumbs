import { Icon } from '@/shared/UI/Icon';
import { classNames } from '@/shared/helpers/classNames';
import styles from './PlayButton.module.scss';

type PlayButtonProps = {
  onClick?: () => void;
  className?: string;
};

export function PlayButton({ onClick, className }: PlayButtonProps) {
  return (
    <button
      type="button"
      className={classNames(styles.button, className)}
      onClick={onClick}
      aria-label="Play video"
    >
      <Icon name="play" size={28} />
    </button>
  );
}
