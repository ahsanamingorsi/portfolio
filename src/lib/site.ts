import type { ImageAsset } from '../data/types';

/** Base path the site is served from. '/' on the custom domain. */
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Turns a root-relative file path (which may contain spaces) into a URL. */
export const asset = (path: string) => `${BASE}/${encodeURI(path.replace(/^\//, ''))}`;

const derivative = (img: ImageAsset, w: number) => asset(`images/optimized/${img.slug}-${w}.webp`);

/** Best URL for a full-size view (lightbox). */
export const largeSrc = (img: ImageAsset) =>
  img.slug && img.widths?.length ? derivative(img, img.widths[img.widths.length - 1]) : asset(img.original);

export const imgSources = (img: ImageAsset) => {
  if (!img.slug || !img.widths?.length) return { src: asset(img.original), srcSet: undefined };
  return {
    src: derivative(img, img.widths[0]),
    srcSet: img.widths.map((w) => `${derivative(img, w)} ${w}w`).join(', '),
  };
};
