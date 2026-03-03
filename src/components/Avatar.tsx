import styles from './Avatar.module.css';
import { getInitials } from '@/lib/utils';

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ src, name, size = 'md' }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${styles.avatar} ${styles[size]}`}
      />
    );
  }

  return (
    <div className={`${styles.fallback} ${styles[size]}`}>
      {getInitials(name)}
    </div>
  );
}
