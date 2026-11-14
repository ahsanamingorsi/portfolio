import { images } from '../../data/images';
import { imgSources } from '../../lib/site';

/** The existing AAG monogram. It is silver and blue, so it always sits on a dark plate. */
export function Logo({ height = 26 }: { height?: number }) {
  const { src, srcSet } = imgSources(images.logo);
  return (
    <span className="logo">
      <img src={src} srcSet={srcSet} sizes={`${Math.round(height * 2.5)}px`} alt="AAG" width={images.logo.width} height={images.logo.height} style={{ height, width: 'auto' }} />
    </span>
  );
}
