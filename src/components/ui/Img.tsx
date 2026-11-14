import { useState, type ReactNode } from 'react';
import type { ImageAsset } from '../../data/types';
import { imgSources } from '../../lib/site';

interface Props {
  image: ImageAsset;
  /** The `sizes` attribute; tells the browser which derivative to pick. */
  sizes?: string;
  className?: string;
  eager?: boolean;
  /** Rendered instead of a broken image when the file cannot be loaded. */
  fallback?: ReactNode;
  alt?: string;
}

/** Responsive image with intrinsic dimensions (no layout shift) and a graceful fallback. */
export function Img({ image, sizes = '100vw', className, eager, fallback = null, alt }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  const { src, srcSet } = imgSources(image);
  return (
    <img
      className={className} src={src} srcSet={srcSet} sizes={srcSet ? sizes : undefined}
      width={image.width} height={image.height} alt={alt ?? image.alt}
      loading={eager ? 'eager' : 'lazy'} decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      onError={() => setFailed(true)}
    />
  );
}
