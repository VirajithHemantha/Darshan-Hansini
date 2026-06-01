import type { ImgHTMLAttributes } from 'react';
import { shouldReduceEffects } from '../utils/device';

type OptimizedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  priority?: boolean;
};

export function OptimizedImage({
  priority = false,
  loading,
  decoding = 'async',
  fetchPriority,
  ...props
}: OptimizedImageProps) {
  const reduceEffects = shouldReduceEffects();

  return (
    <img
      {...props}
      loading={loading ?? (priority ? 'eager' : 'lazy')}
      decoding={decoding}
      fetchPriority={fetchPriority ?? (priority ? 'high' : 'auto')}
      className={
        reduceEffects && props.className?.includes('mix-blend')
          ? props.className.replace(/mix-blend-\S+/g, '').trim()
          : props.className
      }
    />
  );
}
